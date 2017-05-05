---
title: Change hostname and static IP on Centos 7
author: Navy Su
layout: post
---
### Change hostname
* Edit file: /etc/sysconfig/network
```
HOSTNAME=servername.domain.com
```
* Add the servername in /etc/hosts file
* Run hostname command
```bash
sudo hostname servername.domain.com
```
* Restart network service
```bash
sudo /etc/init.d/network restart
```

### Change dynamic IP to static IP
* Edit file: /etc/sysconfig/network-scripts
```
BOOTPROTO="static"
IPADDR="192.168.68.229"
NETMASK="255.255.255.0"
GATEWAY="192.168.68.1"
DNS1="192.168.68.227"
DNS2="192.168.68.218"
DOMAIN=domain.com
```

* Restart network service
```bash
sudo /etc/init.d/network restart
```
