---
id: 212
title: LXD Containers with Static IP Addresses
date: 2016-11-18T09:53:50+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=212
permalink: /2016/11/18/lxd-containers-with-static-ip-addresses/
categories:
  - Linux
  - LXD
  - Ubuntu
tags:
  - ip
  - linux
  - lxd
  - static
  - ubuntu
---
1. Edit /etc/default/lxd-bridge and change the value of LXC_CONFILE
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo vi /etc/default/lxd-bridge
...
# Path to an extra dnsmasq configuration file
LXD_CONFILE="/etc/default/lxd_dnsmasq.conf"
...</pre>

2. Edit /etc/default/lxd_dnsmasq.conf and add container ip setting
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo vi /etc/default/lxd_dnsmasq.conf
# dhcp-host=containername,ipaddress
dhcp-host=myc1,10.0.3.10
</pre>

3. Stop container. restart lxd-bridge, start container

<pre class="prettyprint">$ sudo lxc stop myc1
$ sudo service lxd-bridge stop && sudo service lxd-bridge start
$ sudo lxc start myc1
</pre>

Reference:<a href="http://jason.trickett.us/2016/08/lxd-containers-static-ip-addresses-heres/" target="_blank">http://jason.trickett.us/2016/08/lxd-containers-static-ip-addresses-heres/</a>