---
title: Docker Private Registry
author: Haijun (Navy) Su
layout: post
tags: [docker]
---

## Structure

* Nginx web server as proxy server and using `htpasswd` to verify access
* Registry as docker registry server
* Registry-ui as Web GUI

## Setup Registry

### Without `htpasswd` and running behind Nginx server

#### Setup Nginx

* Generate SSL Server certificate

```shell

#!/usr/bin/env bash

# ssl location
mkdir ssl

# my domain name
mycn="my domain name"

# Specify where we will install
# the xip.io certificate
SSL_DIR="./ssl/${mycn}"

# Set the wildcarded domain
# we want to use
DOMAIN="*.${mycn}"

# A blank passphrase
PASSPHRASE=""

# Set our CSR variables
SUBJ="
C=US
ST=New York
O=
localityName=New York
commonName=$DOMAIN
organizationalUnitName=my org name
emailAddress=web.info@my domain name
"

# Create our SSL directory
# in case it doesn't exist
mkdir -p "$SSL_DIR"

# Generate our Private Key, CSR and Certificate
openssl genrsa -out "$SSL_DIR/${mycn}.key" 4096
openssl req -new -subj "$(echo -n "$SUBJ" | tr "\n" "/")" -key "$SSL_DIR/${mycn}.key" -out "$SSL_DIR/${mycn}.csr" -passin pass:$PASSPHRASE
openssl x509 -req -days 3650 -in "$SSL_DIR/${mycn}.csr" -signkey "$SSL_DIR/${mycn}.key" -out "$SSL_DIR/${mycn}.crt"

```


* Generate user and password

```shell
mkdir conf
htpasswd -b conf/passwordfile username password

```

* Nginx configuration file

conf/nginx.conf

```
error_log  logs/error.log;
pid        logs/nginx.pid;
events {
  worker_connections  1024;
}
http {
        client_body_temp_path /tmp/client_temp;
        proxy_temp_path       /tmp/proxy_temp_path;
        fastcgi_temp_path     /tmp/fastcgi_temp;
        uwsgi_temp_path       /tmp/uwsgi_temp;
        scgi_temp_path        /tmp/scgi_temp;
  include       mime.types;
  default_type  application/octet-stream;
  gzip on;
  gzip_min_length 5000;
  gzip_buffers    4 8k;
  gzip_types text/plain text/html text/css application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_proxied  any;
  gzip_comp_level 2;
  ignore_invalid_headers  on;
  include sites-enabled/*;
}

```

conf/fcgi.conf

```
fastcgi_param  QUERY_STRING       $query_string;
fastcgi_param  REQUEST_METHOD     $request_method;
fastcgi_param  CONTENT_TYPE       $content_type;
fastcgi_param  CONTENT_LENGTH     $content_length;
fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
fastcgi_param  REQUEST_URI        $request_uri;
fastcgi_param  DOCUMENT_URI       $document_uri;
fastcgi_param  DOCUMENT_ROOT      $document_root;
fastcgi_param  SERVER_PROTOCOL    $server_protocol;
fastcgi_param  GATEWAY_INTERFACE  CGI/1.1;
fastcgi_param  SERVER_SOFTWARE    nginx/$nginx_version;
fastcgi_param  REMOTE_ADDR        $remote_addr;
fastcgi_param  REMOTE_PORT        $remote_port;
fastcgi_param  SERVER_ADDR        $server_addr;
fastcgi_param  SERVER_PORT        $server_port;
fastcgi_param  SERVER_NAME        $server_name;
fastcgi_index  index.php ;
fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name ;

# PHP only, required if PHP was built with --enable-force-cgi-redirect
fastcgi_param  REDIRECT_STATUS    200;
fastcgi_connect_timeout 60;
fastcgi_send_timeout 180;
fastcgi_read_timeout 180;
fastcgi_buffer_size 128k;
fastcgi_buffers 4 256k;
fastcgi_busy_buffers_size 256k;
fastcgi_temp_file_write_size 256k;
fastcgi_intercept_errors on;

```

sites-enabled/my domain.conf

```
  map $upstream_http_docker_distribution_api_version $docker_distribution_api_version {
      '' 'registry/2.0';
    }

  server {
      listen 443 ssl;
      server_name hub.mydomain.name;

      # SSL
      ssl_certificate /etc/nginx/ssl/hub.mydomain.name/domain.crt;
      ssl_certificate_key /etc/nginx/ssl/hub.mydomain.name/domain.key;

      # Recommendations from https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html
      ssl_protocols TLSv1.1 TLSv1.2;
      ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';
      ssl_prefer_server_ciphers on;
      ssl_session_cache shared:SSL:10m;

      # disable any limits to avoid HTTP 413 for large image uploads
      client_max_body_size 0;

      # required to avoid HTTP 411: see Issue #1486 (https://github.com/moby/moby/issues/1486)
      chunked_transfer_encoding on;

      location /v2/ {
            # Do not allow connections from docker 1.5 and earlier
            # docker pre-1.6.0 did not properly set the user agent on ping, catch "Go *" user agents
            if ($http_user_agent ~ "^(docker\/1\.(3|4|5(?!\.[0-9]-dev))|Go ).*$" ) {
                    return 404;
                  }

            # To add basic authentication to v2 use auth_basic setting.
            auth_basic "Registry realm";
            auth_basic_user_file /etc/nginx/conf.d/registry.password;

            ## If $docker_distribution_api_version is empty, the header is not added.
            ## See the map directive above where this variable is defined.
            add_header 'Docker-Distribution-Api-Version' $docker_distribution_api_version always;

            proxy_pass                          http://172.20.128.11:5000;
            proxy_set_header  Host              $http_host;   # required for docker client's sake
            proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
            proxy_read_timeout                  900;
          }

      location / {
            # To add basic authentication to v2 use auth_basic setting.
            auth_basic "Registry realm";
            auth_basic_user_file /etc/nginx/conf.d/registry.password;

            proxy_pass                          http://172.20.128.10;
            proxy_set_header  Host              $http_host;   # required for docker client's sake
            proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
            proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header  X-Forwarded-Proto $scheme;
            proxy_read_timeout                  900;
          }
    }
```


* Nginx Docker file

```docker

FROM nginx:alpine

RUN adduser -u 1000 --disabled-password ngUser
USER ngUser

```

* Nginx docker-compose.yaml

```yaml
version: '3'

services:
  nginx:
    build:
      context: .
      dockerfile: Dockerfile-nginx
    image: "cisdd-nginx:alpine"
    ports:
      - "443:443"
      - "80:80"
    volumes:
      - ./conf:/etc/nginx/conf.d
      - ./conf/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl
      - ./sites-enabled:/etc/nginx/sites-enabled
      - ./sites-static-files:/var/www
      - ./runtime/logs:/etc/nginx/logs
        #- ./runtime/cache:/var/cache/nginx
    restart: always
    networks:
      default:
        ipv4_address: 172.20.128.12

networks:
  default:
    external:
      name: my-network

```

#### Registry server without authentication

* conf/config.yaml

```yaml

version: 0.1
log:
  fields:
    service: registry
storage:
  delete:
    enabled: true
  cache:
    blobdescriptor: inmemory
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
    Access-Control-Allow-Origin: ['*']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Allow-Headers: ['Authorization', 'Accept']
    Access-Control-Max-Age: [1728000]
    Access-Control-Allow-Credentials: [true]
    Access-Control-Expose-Headers: ['Docker-Content-Digest']

```

* Dockerfile

```
FROM registry:2

RUN adduser -u 1000 --disabled-password regDockerUser
USER regDockerUser

```

* Docker-compose file

```yaml
version: '3'

services:
  registry:
    build:
      context: .
      dockerfile: Dockerfile-registry
    image: my-registry:2
    #ports:
    #  - "5000:5000"
    environment:
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - ./data:/data
      - ./conf/config.yaml:/etc/docker/registry/config.yml
    restart: always
    networks:
      default:
        ipv4_address: 172.20.128.11

  registry-ui:
    image: joxit/docker-registry-ui:static
    #ports:
    #  - 5001:80
    environment:
      - REGISTRY_TITLE=CISDD Private Docker Registry
      - DELETE_IMAGES=true
      - URL=https://hub.mydomain.name
    depends_on:
      - registry
    restart: always
    networks:
      default:
        ipv4_address: 172.20.128.10

networks:
  default:
    external:
      name: my-network


```

### Registry server with user authentication

* Docker file is same as above
* Generate user and password

```
mkdir auth
htpasswd -b auth/passwordfile username password

```

* config-secure.yaml

```yaml
version: 0.1
log:
  fields:
    service: registry
storage:
  delete:
    enabled: true
  cache:
    blobdescriptor: inmemory
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
    Access-Control-Allow-Origin: ['http://hub.mydomain.name:5001']
    Access-Control-Allow-Methods: ['HEAD', 'GET', 'OPTIONS', 'DELETE']
    Access-Control-Allow-Headers: ['Authorization', 'Accept']
    Access-Control-Max-Age: [1728000]
    Access-Control-Allow-Credentials: [true]
    Access-Control-Expose-Headers: ['Docker-Content-Digest']

```

* docker-compose-secure.yaml

```yaml
version: '3'

services:
  registry:
    build:
      context: .
      dockerfile: Dockerfile-registry
    image: my-registry:1
    ports:
      - "5000:5000"
    environment:
      REGISTRY_AUTH: htpasswd
      REGISTRY_AUTH_HTPASSWD_REALM: Registry
      REGISTRY_AUTH_HTPASSWD_PATH: /auth/registry.password
      REGISTRY_STORAGE_FILESYSTEM_ROOTDIRECTORY: /data
    volumes:
      - ./auth:/auth
      - ./data:/data
      - ./conf/config-secure.yaml:/etc/docker/registry/config.yml
    restart: always

  ui:
    image: joxit/docker-registry-ui:static
    ports:
      - 5001:80
    environment:
      - REGISTRY_TITLE=CISDD Private Docker Registry
      - DELETE_IMAGES=true
      - URL=http://hub.mydomain.name:5000
    depends_on:
      - registry

networks:
  default:
    external:
      name: my-network
```
