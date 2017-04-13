---
id: 212
title: LXD Containers with Static IP Addresses
date: 2016-11-18T09:53:50+00:00
author: Navy Su
layout: post
---
1. Edit /etc/default/lxd-bridge and change the value of LXC_CONFILE
  

```bash
$ sudo vi /etc/default/lxd-bridge

...

# Path to an extra dnsmasq configuration file

LXD_CONFILE="/etc/default/lxd_dnsmasq.conf"

...
```

2. Edit /etc/default/lxd_dnsmasq.conf and add container ip setting
  

```bash
$ sudo vi /etc/default/lxd_dnsmasq.conf

# dhcp-host=containername,ipaddress

dhcp-host=myc1,10.0.3.10

```

3. Stop container. restart lxd-bridge, start container

```bash
$ sudo lxc stop myc1

$ sudo service lxd-bridge stop && sudo service lxd-bridge start

$ sudo lxc start myc1

```

Reference:<a href="http://jason.trickett.us/2016/08/lxd-containers-static-ip-addresses-heres/" target="_blank">http://jason.trickett.us/2016/08/lxd-containers-static-ip-addresses-heres/</a>