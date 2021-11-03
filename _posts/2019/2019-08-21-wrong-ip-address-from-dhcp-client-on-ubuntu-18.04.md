---
title: Wrong IP address from DHCP client on Ubuntu 18.04
author: Haijun (Navy) Su
layout: post
tags: [dhcp, ubuntu, ip]
---
The cause of the problem is that the built-in network config of Ubuntu 18.04 no longer uses the NIC Mac address as the default id for DHCP requests.

It can be restored by adding `dhcp-identifier: mac` to the configuration in the `/etc/netplan/xxx.yaml` (cloud-init) file as follows:

```
network:
    version: 2
    ethernets:
        ens3:
            dhcp4: true
            dhcp-identifier: mac
```

Reference:
<https://superuser.com/questions/1338510/wrong-ip-address-from-dhcp-client-on-ubuntu-18-04>
