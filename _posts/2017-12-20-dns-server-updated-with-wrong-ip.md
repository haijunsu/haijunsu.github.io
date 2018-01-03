---
title: DNS server updated with wrong IP
author: Haijun (Navy) Su
layout: post
tags: [DNS, Windows]
---

After migrated Windows 2003 to Windows 2012 R2, the DNS has a A record with wrong IP of the old server name. Checked DHCP and WINS records, both of them are correctly.

Example:
```shell
srv3 ip is 192.168.1.3
srv1 ip is 192.168.1.5
```
Sometime the A record of srv1 is correctly and sometime not (IP is srv3's ip 192.168.1.3 instead of 192.168.1.5). Even through srv1 is static ip.

### Rootcause:
One of a new domain server (Srv3) has alternate name with old server name (Srv1).
```shell
c:\Windows> netdom computername srv3 /ENUMerate
All the names of the computer are :
srv3.myDomain.local
srv1.myDomain.local
```

#### Solution:
Remove the alternate name of srv3
```shell
netdom computername srv3 /remove:srv1
```

Reference:
<https://serverfault.com/questions/631277/host-a-record-dns-updated-with-wrong-ip-address>

