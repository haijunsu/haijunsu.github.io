---
id: 288
title: 'Automatically enable HTTPS on your website with EFF&#8217;s Certbot, deploying Let&#8217;s Encrypt certificates.'
date: 2016-12-01T23:52:04+00:00
author: Navy Su
layout: post
---
Website: <a href="https://certbot.eff.org/" target="_blank">https://certbot.eff.org/</a>

For Apache on Ubuntu 16.04

```bash
$ sudo apt-get install python-letsencrypt-apache 

$ sudo letsencrypt --apache
```

Add cornjob

```bash
$ sudo vi /etc/crontab

# renew domain certificate

00 7   * * * root letsencrypt renew

00 19  * * * root letsencrypt renew


```