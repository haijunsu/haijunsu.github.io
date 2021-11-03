---
id: 305
title: Clear local DNS cache
date: 2016-12-06T10:45:38+00:00
author: Navy Su
layout: post
---
On Mac OSX

~~~shell
sudo killall -HUP mDNSResponder
~~~

On Mac OSX 10.10.0 – 10.10.3
  

~~~shell
sudo discoveryutil mdnsflushcache
~~~

On Mac OSX 10.5 – 10.6
  

~~~shell
sudo dscacheutil -flushcache
~~~

On Windows
  

~~~shell
ipconfig /flushdns
~~~

On Linux
  

~~~shell
/etc/init.d/named restart

/etc/init.d/nscd restart
~~~

Reference: <a href="https://coolestguidesontheplanet.com/clear-the-local-dns-cache-in-osx/" target="_blank">https://coolestguidesontheplanet.com/clear-the-local-dns-cache-in-osx/</a>