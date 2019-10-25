---
title: ufw
author: Haijun (Navy) Su
layout: page
tags: [ubuntu, firewall, ufw]
---

### Enable IPv6 and Forwarding

```
# /etc/default/ufw

IPV6=yes
DEFAULT_FORWARD_POLICY="ACCEPT"
```

### Enable Forwarding Policy

```
$ sudo ufw default allow routed
```
or

```
# /etc/default/ufw

DEFAULT_FORWARD_POLICY="ACCEPT"
```

##### Enable ip Forwarding

```
# /etc/sysctl.conf

net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1
```
Reload changes

```
$ sudo sysctl -p
```

### Default Policies (allow ssh)
NOTE: make sure ufw is disabled before setting up default policies

```
$ sudo ufw disable 
$ sudo ufw default deny incoming
$ sudo ufw default allow outgoing
$ sudo ufw limit ssh
$ sudo ufw enable
```

### Allow Other Connections

```
$ sudo ufw allow http
$ sudo ufw allow https

# port ranges
$ sudo ufw allow 6000:6007/tcp
$ sudo ufw allow 6000:6007/udp

# ip addresses
$ sudo ufw allow from 192.168.0.1/24
$ sudo ufw allow from 192.168.0.1/24 to any port 22

# special network interface (ex. eth0)
$ sudo ufw all in on eth0 to any pot 80

```

### Denying Connection
It sames as allowing connection. Change the `allow` to `deny`

```
$ sudo ufw deny http
```

### Deleting Rules

##### By Rule Number

```
# numbered will let status show number ids of rules
$ sudo ufw status numbered
$ sudo ufw delete 2
```

##### By Actural Rule
Add `delete` before `allow`

```
sudo ufw delete allow http
```

### Port Forwarding
* Edit /etc/ufw/before.rules

```
*nat
:PREROUTING ACCEPT [0:0]
# forward 202.54.1.1 port 80 to 192.168.1.100:80
# forward 202.54.1.1 port 443 to 192.168.1.100:443
-A PREROUTING -i eth0 -d 202.54.1.1 -p tcp --dport 80 -j DNAT --to-destination 192.168.1.100:80
-A PREROUTING -i eth0 -d 202.54.1.1 -p tcp --dport 443 -j DNAT --to-destination 192.168.1.100:443
# setup routing
-A POSTROUTING -s 192.168.1.0/24 ! -d 192.168.1.0/24 -j MASQUERADE
COMMIT
```

* Open host port

```
$ sudo ufw allow proto tcp from any to 202.54.1.1 port 80
$ sudo ufw allow proto tcp from any to 202.54.1.1 port 443
```

* Check settings

```
$ sudo ufw status
$ sudo iptables -t nat -L -n -v
```

### Reference
[How to configure ufw to forward port 80/443 to internal server hosted on LAN](https://www.cyberciti.biz/faq/how-to-configure-ufw-to-forward-port-80443-to-internal-server-hosted-on-lan/)

[To Fix The Docker and UFW Security Flaw Without Disabling Iptables](https://github.com/chaifeng/ufw-docker#%E5%A4%AA%E9%95%BF%E4%B8%8D%E6%83%B3%E8%AF%BB)

[ufw - program for managing a netfilter firewall](http://manpages.ubuntu.com/manpages/cosmic/en/man8/ufw.8.html)

[Pre-define network](https://askubuntu.com/questions/903337/how-can-i-configure-my-firewall-to-work-with-docker)

[Disable docker iptables function](https://www.cyberciti.biz/faq/how-to-configure-ufw-to-forward-port-80443-to-internal-server-hosted-on-lan/)
