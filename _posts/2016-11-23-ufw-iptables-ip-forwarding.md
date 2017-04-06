---
id: 230
title: UFW, IPTABLES and IP FORWARDING
date: 2016-11-23T11:06:53+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=230
permalink: /2016/11/23/ufw-iptables-ip-forwarding/
categories:
  - Linux
  - Ubuntu
tags:
  - firewall
  - forwarding
  - ip
  - iptables
  - linux
  - secure
  - ubuntu
  - ufw
---
BY Default, UFW blocks IP Forwarding. To enable packet forwarding, two configuration files will need to be adjusted, in /etc/default/ufw change the DEFAULT\_FORWARD\_POLICY to &#8220;ACCEPT&#8221;:

<pre class="prettyprint">DEFAULT_FORWARD_POLICY="ACCEPT"</pre>

Then edit /etc/ufw/sysctl.conf and uncomment:

<pre class="prettyprint">net/ipv4/ip_forward=1
#for IPv6 forwarding uncomment:
net/ipv6/conf/default/forwarding=1</pre>

To enable IPv4 packet forwarding by editing /etc/sysctl.conf and uncomment the following line:

<pre class="prettyprint">net.ipv4.ip_forward=1
# If you wish to enable IPv6 forwarding also uncomment:
net.ipv6.conf.default.forwarding=1
</pre>

Execute the sysctl command to enable the new settings in the configuration file:<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo sysctl -p</pre>

Create my-iptables-rules:

<pre class="prettyprint">$ sudo vi /etc/network/if-up.d/my-iptables-rules
#!/bin/bash
FLAG="/tmp/my-iptables-settings"
if [ -f ${FLAG} ]; then
  echo "Already set my iptables rules. Skip it."
  exit 0
fi

#sample iptables rules
iptables -t nat -A POSTROUTING -s 192.168.0.0/16 -o ppp0 -j MASQUERADE

touch ${FLAG}
exit 0</pre>

Reference:<a href="https://help.ubuntu.com/lts/serverguide/firewall.html" target="_blank">https://help.ubuntu.com/lts/serverguide/firewall.html</a>