---
id: 288
title: 'Automatically enable HTTPS on your website with EFF&#8217;s Certbot, deploying Let&#8217;s Encrypt certificates.'
date: 2016-12-01T23:52:04+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=288
permalink: /2016/12/01/automatically-enable-https-on-your-website-with-effs-certbot-deploying-lets-encrypt-certificates/
categories:
  - Linux
  - Ubuntu
tags:
  - encrypt
  - https
  - secure
---
Website: <a href="https://certbot.eff.org/" target="_blank">https://certbot.eff.org/</a>

For Apache on Ubuntu 16.04

<pre class="prettyprint">$ sudo apt-get install python-letsencrypt-apache 
$ sudo letsencrypt --apache</pre>

Add cornjob<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo vi /etc/crontab
# renew domain certificate
00 7   * * * root letsencrypt renew
00 19  * * * root letsencrypt renew
</pre>