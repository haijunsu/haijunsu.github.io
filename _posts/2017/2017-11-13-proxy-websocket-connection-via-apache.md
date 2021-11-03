---
title: Proxy Websocket Connection via Apache
author: Haijun (Navy) Su
layout: post
tags: [apache, proxy, websocket]
---

* Enable mod_proxy_wstunnel
```shell
sudo a2enmod mod_proxy_wstunnel
```

* Configure virtual host
```shell
ProxyRequests Off
ProxyPass "/ws/" "ws://localhost:9020"
ProxyPass "/wss" "wss://localhost:9020"
```

* Connect to server using websocket
```javascript
var connection = new WebSocket('ws://localhost/ws');
```

Reference
<http://blog.revathskumar.com/2015/09/proxy-websocket-via-apache.html>
