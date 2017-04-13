---
id: 150
title: Customize DNS nameservers with DHCP setting by NetworkManger on CentOS 7
date: 2016-11-10T15:30:33+00:00
author: Navy Su
layout: post
---
By default, Network Manager always changes the resolv.conf file if the interface is using DHCP. The NetworkManger puts the records from DHCP server on top and the customize DNS servers at bottom. It causes private DNS setting cannot be found. To fix it, just change the **_PEERDNS=no_** in /etc/sysconfig/network-scripts/ifcfg-eth0 and restart network