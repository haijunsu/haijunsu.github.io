---
title: Linux Firewall for Docker Swarm on CentOS 7
author: Haijun (Navy) Su
layout: post
tags: [docker, firewall, linux]
---

### Firewalld
```shell
firewall-cmd --add-port=2376/tcp --permanent
firewall-cmd --add-port=2377/tcp --permanent
firewall-cmd --add-port=7946/tcp --permanent
firewall-cmd --add-port=7946/udp --permanent
firewall-cmd --add-port=4789/udp --permanent
firewall-cmd --reload
systemctl restart docker
```

### IPTables
```shell
iptables -I INPUT -p tcp --dport 2376 -j ACCEPT
iptables -I INPUT -p tcp --dport 2377 -j ACCEPT
iptables -I INPUT -p tcp --dport 7946 -j ACCEPT
iptables -I INPUT -p udp --dport 7946 -j ACCEPT
iptables -I INPUT -p udp --dport 4789 -j ACCEPT
systemctl restart docker
```
