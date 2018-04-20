---
title: Apache Proxy Balancer
author: Haijun (Navy) Su
layout: post
tags: [proxy, balancer, apache, linux]
---
### Enable proxy models
```shell
sudo a2enmod proxy_html
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel
sudo a2enmod proxy_ajp
sudo a2enmod lbmethod_byrequests
sudo a2enmod lbmethod_bytraffic
sudo a2enmod lbmethod_bybusyness
sudo a2enmod lbmethod_heartbeat
```

### Modify configuration file
```xml
<IfModule mod_ssl.c>
<VirtualHost *:443>
  ServerName happynavy.tk
  ServerAlias www.happynavy.tk
  ServerAdmin me@gmail

  ProxyPreserveHost On

  Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED
  <Proxy "balancer://mycluster">
    BalancerMember "http://swarm-manager01:3080" route=1
    BalancerMember "http://swarm-manager02:3080" route=2
    BalancerMember "http://swarm-manager03:3080" route=3
    ProxySet stickysession=ROUTEID
  </Proxy>
  ProxyPass "/" "balancer://mycluster/"
  ProxyPassReverse "/" "balancer://mycluster/"

  SSLCertificateFile /etc/letsencrypt/live/happynavy.tk/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/happynavy.tk/privkey.pem
  Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>

</IfModule>
```

source: <https://httpd.apache.org/docs/2.4/mod/mod_proxy_balancer.html>
