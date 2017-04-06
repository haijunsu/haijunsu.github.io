---
id: 418
title: Open range ports via ufw or iptables
date: 2017-03-15T11:19:43+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=418
permalink: /2017/03/15/open-range-ports-via-ufw-or-iptables/
categories:
  - Linux
  - Ubuntu
tags:
  - iptables
  - linux
  - ports
  - security
  - ubuntu
  - ufw
---
For UFW

<pre class="prettyprint">ufw allow from any to any port 4000:4020 proto tcp</pre>

For iptables

<pre class="prettyprint">iptables -A tableName -p tcp  --match multiport --dports port1,port2 -j ACCEPT
iptables -A tableName -p udp  --match multiport --dports port1,port2 -j DROP
iptables -A tableName -p protocol  --match multiport --dports portRange1:PortRange2 -j ACCEPT
</pre>

<pre class="prettyprint">iptables -A tableName -p tcp  --match multiport --sports port1,port2 -j ACCEPT
iptables -A tableName -p udp  --match multiport --sports port1,port2 -j DROP
iptables -A tableName -p protocol  --match multiport --sports portRange1:PortRange2 -j ACCEPT

</pre>