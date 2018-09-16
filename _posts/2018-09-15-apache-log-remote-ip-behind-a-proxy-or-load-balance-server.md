---
title: Apache Log Remote IP Behind a Proxy or Load-balance Server
author: Haijun (Navy) Su
layout: post
tags: [apache, proxy]
---

* Enable mod remoteip
```shell
a2enmod remoteip
```

* Update /etc/apache2/apache2.conf
```
# add
RemoteIPHeader X-Forwarded-For

# modify log format - change %h to %a
#LogFormat "%v:%p %h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" vhost_combined
#LogFormat "%h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
#LogFormat "%h %l %u %t \"%r\" %>s %O" common
LogFormat "%v:%p %a %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" vhost_combined
LogFormat "%a %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined
LogFormat "%a %l %u %t \"%r\" %>s %O" common
```

# Restart Apache server
```
systemctl restart apache2.service
```


Refer: <https://aws.amazon.com/premiumsupport/knowledge-center/log-client-ip-load-balancer-apache/>
