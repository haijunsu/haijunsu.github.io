---
id: 260
title: Apache2 configuration for proxy
date: 2016-11-30T12:10:50+00:00
author: Navy Su
layout: post
---
Proxy Modules:

  * **mod_proxy:** The main proxy module for Apache that manages connections and redirects them.
  * **mod\_proxy\_http:** This module implements the proxy features for HTTP and HTTPS protocols.
  * **mod\_proxy\_ftp:** This module does the same but for FTP protocol.
  * **mod\_proxy\_fcgi**: FastCGI
  * **mod\_proxy\_connect:** This one is used for SSL tunnelling.
  * **mod\_proxy\_ajp:** Used for working with the AJP protocol.
  * **mod\_proxy\_wstunnel:** Used for working with web-sockets (i.e. WS and WSS).
  * **mod\_proxy\_balancer:** Used for clustering and load-balancing.
  * **mod\_proxy\_hcheck**: Dynamic health check of Balancer members (workers) for mod_proxy
  * **mod_cache:** Used for caching.
  * **mod_headers:** Used for managing HTTP headers.
  * **mod_deflate:** Used for compression.

Enable proxy:

~~~bash
sudo a2enmod proxy

sudo a2enmod proxy_http

sudo a2enmod proxy_html

sudo a2enmod xml2enc

sudo systemctl restart apache2
~~~

Example virtual host #1

~~~bash
<VirtualHost *:80>

    ServerName localhost

    ProxyPreserveHost On

    ProxyPass "/" "http://192.168.0.0:8080/"

    ProxyPassReverse "/" "http://192.168.0.1:8080/"

</VirtualHost>
~~~

Example virtual host #2

~~~bash
<VirtualHost *:80>

    ServerName localhost

    ProxyPreserveHost On

    ProxyPass "/subdir/" "http://192.168.0.221:8000/"

    ProxyPassReverse "/subdir/" "http://192.168.0.221:8000/"

     <Location "/subdir">

         ProxyPassReverse    /

         ProxyHTMLURLMap     / /subdir/

     </Location>

</VirtualHost>
~~~

Example virtual host #3 (Don&#8217;t proxy /static)

~~~bash
<VirtualHost *:80>

    ServerName localhost

    ProxyPreserveHost On

    ProxyPass "/" "http://192.168.0.221:8000/"

    ProxyPassReverse "/" "http://192.168.0.221:8000/"

    Alias /static/ /var/www/html/static/

    <Directory /var/www/html/static>

        Require all granted

    </Directory>

    <Location /static>

        ProxyPass "!"

    </Location>

</VirtualHost>
~~~

Enable load balancing:

~~~bash
sudo a2enmod proxy_balancer

sudo a2enmod proxy_hcheck

sudo systemctl restart apache2
~~~

Example load balancing #1

~~~bash
<Proxy balancer://myset>

    BalancerMember http://www2.example.com:8080

    BalancerMember http://www3.example.com:8080

    ProxySet lbmethod=bytraffic

</Proxy>

ProxyPass "/images/"  "balancer://myset/"

ProxyPassReverse "/images/"  "balancer://myset/"
~~~

Example load balancing #2 (www3 handles 3 times traffic and timeout is 1)

~~~bash
<Proxy balancer://myset>

    BalancerMember http://www2.example.com:8080

    BalancerMember http://www3.example.com:8080 loadfactor=3 timeout=1

    ProxySet lbmethod=bytraffic

</Proxy>

ProxyPass "/images"  "balancer://myset/"

ProxyPassReverse "/images"  "balancer://myset/"
~~~

Example failove

~~~
<Proxy balancer://myset>
    BalancerMember http://www2.example.com:8080
    BalancerMember http://www3.example.com:8080 loadfactor=3 timeout=1
    BalancerMember http://hstandby.example.com:8080 status=+H
    BalancerMember http://bkup1.example.com:8080 lbset=1
    BalancerMember http://bkup2.example.com:8080 lbset=1
    ProxySet lbmethod=byrequests
</Proxy>
ProxyPass "/images/"  "balancer://myset/"
ProxyPassReverse "/images/"  "balancer://myset/"
~~~

Balancer Manager (Don't enable it in production)
~~~
<Location "/balancer-manager">
    SetHandler balancer-manager
    Require host localhost
</Location>
~~~

Controlling access proxy

~~~bash
<Proxy "*">
  Require ip 192.168.0
</Proxy>
~~~

Reference:

<a href="https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension" target="_blank">https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension</a>

<a href="https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html" target="_blank">https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html</a>

<a href="https://httpd.apache.org/docs/2.4/mod/mod_proxy.html" target="_blank">https://httpd.apache.org/docs/2.4/mod/mod_proxy.html</a>
