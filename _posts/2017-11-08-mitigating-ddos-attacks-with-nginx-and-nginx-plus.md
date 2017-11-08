---
title: Mitigating DDoS Attacks with NGINX and NGINX Plus
author: Haijun (Navy) Su
layout: post
tags: [nginx, ddos, web, caching]
---

[Tuning Nginx for Performance](https://www.nginx.com/blog/tuning-nginx/)
[10 Tips for 10x Application Performance](https://www.nginx.com/blog/10-tips-for-10x-application-performance/)

* Limiting the Rate of Requests
Example: Allow a single client IP address to attempt to login only every 2 seconds (equivalent to 30 requests per minute)

```ini
limit_req_zone $binary_remote_addr zone=one:10m rate=30r/m;

server {
    # ...
    location /login.html {
        limit_req zone=one;
    # ...
    }
}
```

* Limiting the Number of Connections
Example: Allow each client IP address to open no more than 10 connections to the /store area of your website

```ini
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    # ...
    location /store/ {
        limit_conn addr 10;
        # ...
    }
}
```

* Closing Slow Connections
Example: Wait no more than 5 seconds between writes from the client for either headers or body
```ini
server {
    client_body_timeout 5s;
    client_header_timeout 5s;
    # ...
}
```

* Blacklisting IP Addresses
Example: Block IP from the address range 123.123.123.1 through 123.123.123.16
```ini
location / {
    deny 123.123.123.0/28;
    # ...
}
```
Example: Block IP from the client IP address 123.123.123.3, 123.123.123.5, and 123.123.123.7
```ini
location / {
    deny 123.123.123.3;
    deny 123.123.123.5;
    deny 123.123.123.7;
    # ...
}
```

* Whitelisting IP Addresses
Example: Restrict access to only addresses in a specific local network
```ini
location / {
    allow 192.168.1.0/24;
    deny all;
    # ...
}
```

* Using Caching to Smooth Traffic Spikes
    * The **updating** parameter to the *proxy_cache_use_stale* directive tells NGINX that when it needs to fetch an update of a stale cached object, it should send just one request for the update, and continue to serve the stale object to clients who request it during the time it takes to receive the update from the backend server. When repeated requests for a certain file are part of an attack, this dramatically reduces the number of requests to the backend servers.
    * The key defined by the *proxy_cache_key* directive usually consists of embedded variables (the default key, **$scheme$proxy_host$request_uri**, has three variables). If the value includes the *$query_string* variable, then an attack that sends random query strings can cause excessive caching. We recommend that you **don’t** include the *$query_string* variable in the key unless you have a particular reason to do so.

* Blocking Requests
Example: Block all requests for /foo.php
```ini
location /foo.php {
    deny all;
}
```
Example: Block requests have a **User-Agent** header value of *foo* or *bar*
```ini
location / {
    if ($http_user_agent ~* foo|bar) {
        return 403;
    }
    # ...
}
```

* Limiting the Connections to Backend Servers (Nginx Plus only)
Example: Limit Nginx Plus to establishing no more than 200 connections to each of the two backend servers in the website upstream group
```ini
upstream website {
    server 192.168.100.1:80 max_conns=200;
    server 192.168.100.2:80 max_conns=200;
    queue 10 timeout=30s;
}
```

Reference: <https://www.nginx.com/blog/mitigating-ddos-attacks-with-nginx-and-nginx-plus/>

