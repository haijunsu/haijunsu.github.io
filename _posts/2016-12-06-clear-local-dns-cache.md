---
id: 305
title: Clear local DNS cache
date: 2016-12-06T10:45:38+00:00
author: Navy Su
layout: post
---
On Mac OSX

```bash
sudo killall -HUP mDNSResponder
```

On Mac OSX 10.10.0 – 10.10.3
  

```bash
sudo discoveryutil mdnsflushcache
```

On Mac OSX 10.5 – 10.6
  

```bash
sudo dscacheutil -flushcache
```

On Windows
  

```bash
ipconfig /flushdns
```

On Linux
  

```bash
/etc/init.d/named restart

/etc/init.d/nscd restart
```

Reference: <a href="https://coolestguidesontheplanet.com/clear-the-local-dns-cache-in-osx/" target="_blank">https://coolestguidesontheplanet.com/clear-the-local-dns-cache-in-osx/</a>