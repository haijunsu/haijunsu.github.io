---
id: 140
title: firewall-cmd examples
date: 2016-11-09T16:25:03+00:00
author: Navy Su
layout: post
---
~~~bash
systemctl status firewalld

firewall-cmd --state

firewall-cmd --get-default-zone

firewall-cmd --get-active-zones

firewall-cmd --get-zones

firewall-cmd --set-default-zone=home

firewall-cmd --permanent --zone=internal --change-interface=eth0

firewall-cmd --list-all

firewall-cmd --reload

firewall-cmd --list-interfaces

firewall-cmd --add-interface=<interface>

firewall-cmd --add-service=http

firewall-cmd --add-port=443/tcp

firewall-cmd --permanent --add-port=443/tcp

firewall-cmd --add-masquerade

firewall-cmd --add-service=dns --add-service=dhcp

firewall-cmd --runtime-to-permanent

firewall-cmd --permanent --direct --get-all-rules

~~~
