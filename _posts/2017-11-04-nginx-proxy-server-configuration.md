---
title: Nginx Proxy Server Configuration
author: Haijun (Navy) Su
layout: post
tags: [ngnix, proxy]
---
Example 1:
```shell
server {
    listen 80;
    index index.html index.htm index.nginx-debian.html index.php;
    server_name aaa.bbb.ccc.ddd;
    location ~/app2(.*)$ {
        proxy_set_header X-Real-IP  $remote_addr;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_pass http://aaa.bbb.ccc.ddd:8001$1;
    }
}
```

Example 2:
```shell
    server {
         listen      80 default_server;
        listen      [::]:80 default_server;
        server_name www.srv.world;

        proxy_redirect           off;
        proxy_set_header         X-Real-IP $remote_addr;
        proxy_set_header         X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header         Host $http_host;

        location / {
            proxy_pass http://node01.srv.world/;
        }
     }
```

Example 3:
```shell
    server {
         listen      80 default_server;
        listen      [::]:80 default_server;
        server_name www.srv.world;

        location /socket.io/ {
            proxy_pass http://node01.srv.world:1337/socket.io/;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection "upgrade";
        }

        location /chat {
            proxy_pass         http://node01.srv.world:1337/;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade $http_upgrade;
            proxy_set_header   Connection "upgrade";
        }

        location / {
            proxy_pass http://node01.srv.world/;
        }
     }
```

Example 4:
```shell
# add into http section
# "backup" means this server is baranced only when other servers are down
# "weight=*" means barancing weight
http {
    upstream backends {
        server node01.srv.world:80 weight=3;
        server node02.srv.world:80;
        server node03.srv.world:80 backup;
    }

# change like follows in "server" section
    server {
         listen      80 default_server;
        listen      [::]:80 default_server;
        server_name www.srv.world;

        proxy_redirect           off;
        proxy_set_header         X-Real-IP $remote_addr;
        proxy_set_header         X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header         Host $http_host;

        location / {
            proxy_pass http://backends;
        }
     }
```

Reference:
<https://www.server-world.info/en/note?os=CentOS_7&p=nginx&f=6>
