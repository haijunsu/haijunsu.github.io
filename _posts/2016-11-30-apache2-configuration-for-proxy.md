---
id: 260
title: Apache2 configuration for proxy
date: 2016-11-30T12:10:50+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=260
permalink: /2016/11/30/apache2-configuration-for-proxy/
categories:
  - apache2
  - Linux
tags:
  - apache
  - blance
  - proxy
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

Enable proxy:<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_html
sudo a2enmod xml2enc
sudo systemctl restart apache2</pre>

Example virtual host #1

<pre class="prettyprint">&lt;VirtualHost *:80&gt;
    ServerName localhost
    ProxyPreserveHost On

    ProxyPass "/" "http://192.168.0.0:8080/"
    ProxyPassReverse "/" "http://192.168.0.1:8080/"

&lt;/VirtualHost&gt;</pre>

Example virtual host #2

<pre class="prettyprint">&lt;VirtualHost *:80&gt;
    ServerName localhost
    ProxyPreserveHost On

    ProxyPass "/subdir/" "http://192.168.0.221:8000/"
    ProxyPassReverse "/subdir/" "http://192.168.0.221:8000/"
     &lt;Location "/subdir"&gt;
         ProxyPassReverse    /
         ProxyHTMLURLMap     / /subdir/
     &lt;/Location&gt;

&lt;/VirtualHost&gt;</pre>

Example virtual host #3 (Don&#8217;t proxy /static)<!--?prettify linenums=true?-->

<pre class="prettyprint">&lt;VirtualHost *:80&gt;
    ServerName localhost

    ProxyPreserveHost On
    ProxyPass "/" "http://192.168.0.221:8000/"
    ProxyPassReverse "/" "http://192.168.0.221:8000/"
    Alias /static/ /var/www/html/static/
    &lt;Directory /var/www/html/static&gt;
        Require all granted
    &lt;/Directory&gt;
    &lt;Location /static&gt;
        ProxyPass "!"
    &lt;/Location&gt;
&lt;/VirtualHost&gt;</pre>

Enable load balancing:<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo a2enmod proxy_balancer
sudo a2enmod proxy_hcheck
sudo systemctl restart apache2</pre>

Example load balancing #1

<pre class="prettyprint">&lt;Proxy balancer://myset&gt;
    BalancerMember http://www2.example.com:8080
    BalancerMember http://www3.example.com:8080
    ProxySet lbmethod=bytraffic
&lt;/Proxy&gt;

ProxyPass "/images/"  "balancer://myset/"
ProxyPassReverse "/images/"  "balancer://myset/"</pre>

Example load balancing #2 (www3 handles 3 times traffic and timeout is 1)

<pre class="prettyprint">&lt;Proxy balancer://myset&gt;
    BalancerMember http://www2.example.com:8080
    BalancerMember http://www3.example.com:8080 loadfactor=3 timeout=1
    ProxySet lbmethod=bytraffic
&lt;/Proxy&gt;

ProxyPass "/images"  "balancer://myset/"
ProxyPassReverse "/images"  "balancer://myset/"</pre>

Example failove

<pre class="prettyprint lang-config prettyprinted"><span class="pun">&lt;</span><span class="tag">Proxy</span><span class="pln"> balancer</span><span class="pun">://</span><span class="pln">myset</span><span class="pun">&gt;</span>
    <span class="kwd">BalancerMember</span><span class="pln"> http</span><span class="pun">://</span><span class="pln">www2</span><span class="pun">.</span><span class="pln">example</span><span class="pun">.</span><span class="pln">com</span><span class="pun">:</span><span class="lit">8080</span>
    <span class="kwd">BalancerMember</span><span class="pln"> http</span><span class="pun">://</span><span class="pln">www3</span><span class="pun">.</span><span class="pln">example</span><span class="pun">.</span><span class="pln">com</span><span class="pun">:</span><span class="lit">8080</span><span class="pln"> loadfactor</span><span class="pun">=</span><span class="lit">3</span><span class="pln"> timeout</span><span class="pun">=</span><span class="lit">1</span>
    <span class="kwd">BalancerMember</span><span class="pln"> http</span><span class="pun">://</span><span class="pln">hstandby</span><span class="pun">.</span><span class="pln">example</span><span class="pun">.</span><span class="pln">com</span><span class="pun">:</span><span class="lit">8080</span><span class="pln"> status</span><span class="pun">=+</span><span class="pln">H
    </span><span class="kwd">BalancerMember</span><span class="pln"> http</span><span class="pun">://</span><span class="pln">bkup1</span><span class="pun">.</span><span class="pln">example</span><span class="pun">.</span><span class="pln">com</span><span class="pun">:</span><span class="lit">8080</span><span class="pln"> lbset</span><span class="pun">=</span><span class="lit">1</span>
    <span class="kwd">BalancerMember</span><span class="pln"> http</span><span class="pun">://</span><span class="pln">bkup2</span><span class="pun">.</span><span class="pln">example</span><span class="pun">.</span><span class="pln">com</span><span class="pun">:</span><span class="lit">8080</span><span class="pln"> lbset</span><span class="pun">=</span><span class="lit">1</span>
    <span class="kwd">ProxySet</span><span class="pln"> lbmethod</span><span class="pun">=</span><span class="pln">byrequests
</span><span class="pun">&lt;/</span><span class="tag">Proxy</span><span class="pun">&gt;</span>

<span class="kwd">ProxyPass</span> <span class="str">"/images/"</span>  <span class="str">"balancer://myset/"</span>
<span class="kwd">ProxyPassReverse</span> <span class="str">"/images/"</span>  <span class="str">"balancer://myset/"</span></pre>

Balancer Manager (Don&#8217;t enable it in production)

<pre class="prettyprint lang-config prettyprinted"><span class="pun">&lt;</span><span class="tag">Location</span> <span class="str">"/balancer-manager"</span><span class="pun">&gt;</span>
    <span class="kwd">SetHandler</span><span class="pln"> balancer-manager
    </span><span class="kwd">Require</span><span class="pln"> host localhost
</span><span class="pun">&lt;/</span><span class="tag">Location</span><span class="pun">&gt;</span></pre>

Controlling access proxy

<pre class="prettyprint">&lt;Proxy "*"&gt;
  Require ip 192.168.0
&lt;/Proxy&gt;</pre>

Reference:

<a href="https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension" target="_blank">https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension</a>
  
<a href="https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html" target="_blank">https://httpd.apache.org/docs/2.4/howto/reverse_proxy.html</a>
  
<a href="https://httpd.apache.org/docs/2.4/mod/mod_proxy.html" target="_blank">https://httpd.apache.org/docs/2.4/mod/mod_proxy.html</a>