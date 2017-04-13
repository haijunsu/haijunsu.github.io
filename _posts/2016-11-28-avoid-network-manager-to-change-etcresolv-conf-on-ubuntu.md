---
id: 253
title: Avoid Network Manager to change /etc/resolv.conf on Ubuntu
date: 2016-11-28T22:44:20+00:00
author: Navy Su
layout: post
---
By default, it links to ../run//resolvconf/resolv.conf

```bash
$ sudo rm /etc/resolv.conf
```

Create you own resolv.conf

```bash
$ sudo vi /etc/resolv.conf

nameserver 192.168.0.1

nameserver 192.168.0.2

search &lt;your domain name&gt;


```