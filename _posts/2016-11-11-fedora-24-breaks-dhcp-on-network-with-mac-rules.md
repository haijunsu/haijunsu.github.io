---
id: 162
title: Fedora 24 breaks dhcp on network with mac rules
date: 2016-11-11T12:28:22+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=162
permalink: /2016/11/11/fedora-24-breaks-dhcp-on-network-with-mac-rules/
categories:
  - Fedora
  - Linux
tags:
  - dhcp
  - Fedora
  - linux
  - MAC
---
If dhcp server assign ip based on MAC, Fedora 24 client can&#8217;t get the right IP.

Root cause: After fresh install Fedora 24, there is no /etc/dhcp/dhclient.conf. Not sure what Network Manger does to acquire IP addess.

Solution: Create /etc/dhcp/dhclient.conf

<pre class="prettyprint">$ sudo vi /etc/dhcp/dhclient.conf

send dhcp-client-identifier = hardware;
</pre>

&nbsp;