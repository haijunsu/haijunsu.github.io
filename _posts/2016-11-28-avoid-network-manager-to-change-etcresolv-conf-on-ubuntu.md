---
id: 253
title: Avoid Network Manager to change /etc/resolv.conf on Ubuntu
date: 2016-11-28T22:44:20+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=253
permalink: /2016/11/28/avoid-network-manager-to-change-etcresolv-conf-on-ubuntu/
categories:
  - Linux
  - Ubuntu
tags:
  - dns
  - resolv.conf
  - ubuntu
---
By default, it links to ../run//resolvconf/resolv.conf

<pre class="prettyprint">$ sudo rm /etc/resolv.conf</pre>

Create you own resolv.conf

<pre class="prettyprint">$ sudo vi /etc/resolv.conf
nameserver 192.168.0.1
nameserver 192.168.0.2
search &lt;your domain name&gt;
</pre>