---
id: 418
title: Open range ports via ufw or iptables
date: 2017-03-15T11:19:43+00:00
author: Navy Su
layout: post
---
For UFW

```bash
ufw allow from any to any port 4000:4020 proto tcp
```

For iptables

```bash
iptables -A tableName -p tcp  --match multiport --dports port1,port2 -j ACCEPT

iptables -A tableName -p udp  --match multiport --dports port1,port2 -j DROP

iptables -A tableName -p protocol  --match multiport --dports portRange1:PortRange2 -j ACCEPT

```

```bash
iptables -A tableName -p tcp  --match multiport --sports port1,port2 -j ACCEPT

iptables -A tableName -p udp  --match multiport --sports port1,port2 -j DROP

iptables -A tableName -p protocol  --match multiport --sports portRange1:PortRange2 -j ACCEPT

```