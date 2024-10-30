---
title: Use MAC as client id for DHCP on Ubuntu 24.04
author: Haijun (Navy) Su
layout: post
tags: [Ubuntu, DHCP, MAC, ClientID]
---

On Ubuntu 24.04, the DHCP configuration file is `/etc/dhcpcd.conf`. Uncommented the `clientid` line and commented the `duid` line, and now the DHCP client is getting it's assigned IP reservation based on the MAC instead of the client ID.

```
# Use the hardware address of the interface for the Client ID.
clientid
# or
# Use the same DUID + IAID as set in DHCPv6 for DHCPv4 ClientID as per RFC4361.
# Some non-RFC compliant DHCP servers do not reply with this set.
# In this case, comment out duid and enable clientid above.
# duid
```

Also create a dhcp file for netplan `/etc/netplan/01-dhcp-mac.conf`.

```
# This file is generated from information provided by the datasource.  Changes
# to it will not persist across an instance reboot.  To disable cloud-init's
# network configuration capabilities, write a file
# /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg with the following:
# network: {config: disabled}
network:
    ethernets:
        enp1s0:
            dhcp4: true
            dhcp-identifier: mac

    version: 2
```

*For some reason, I have trouble with two network interfaces when I access the network from internet. I have to remove one interface*
