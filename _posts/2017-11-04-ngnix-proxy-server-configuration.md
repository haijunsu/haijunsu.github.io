---
title: Ngnix Proxy Server Configuration
author: Haijun (Navy) Su
layout: post
tags: [ngnix, proxy]
---
Example:
```ini
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
