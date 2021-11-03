---
title: HTTP 413 Request Entity Too Large Error
author: Haijun (Navy) Su
layout: post
tags: [apache, nginx, http, php]
---
* Fix Nginx

The `client_max_body_size` directive assigns the maximum accepted body size of client request, indicated by the line Content-Length in the header of request. If size is greater the given one, then the client gets the error “Request Entity Too Large” (413).
Edit `/etc/nginx/nginx.conf` and modify `client_max_body_size` value. Example
```ini
# set client body size to 2M #
client_max_body_size 2M;
```

* Fix PHP
Edit php.ini

```ini
;This sets the maximum amount of memory in bytes that a script is allowed to allocate
memory_limit = 32M

;The maximum size of an uploaded file.
upload_max_filesize = 2M

;Sets max size of post data allowed. This setting also affects file upload. To upload large files, this value must be larger than upload_max_filesize
post_max_size = 3M
```

Reference:
<https://www.cyberciti.biz/faq/linux-unix-bsd-nginx-413-request-entity-too-large/>
