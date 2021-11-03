---
title: Centos KVM Guest No Internet Access
author: Haijun (Navy) Su
layout: post
tags: [kvm, centos, iptables, network]
---
It is strange that guest cannot access internet.
Try step 1:
```
sudo systemctl restart libvirtd
```

If step 1 doesn't work, you need manual update your iptables
These lines in the FORWARD chain:
```
ACCEPT     all  --  anywhere             192.168.100.128
ACCEPT     all  --  anywhere             guest-subdomain
```

should be before the reject rules. Such that:
```
Chain FORWARD (policy ACCEPT)
target     prot opt source               destination
ACCEPT     all  --  anywhere             192.168.100.128
ACCEPT     all  --  anywhere             guest-subdomain
ACCEPT     all  --  anywhere             192.168.100.0/24    state RELATED,ESTABLISHED
ACCEPT     all  --  192.168.100.0/24     anywhere
ACCEPT     all  --  anywhere             anywhere
REJECT     all  --  anywhere             anywhere            reject-with icmp-port-unreachable
REJECT     all  --  anywhere             anywhere            reject-with icmp-port-unreachable
```
You can delete them and use the following to insert the rules at the top.

```
iptables -I FORWARD -d guest-subdomain -j ACCEPT
iptables -I FORWARD -d 192.168.100.128 -j ACCEPT
```

Update client IP
```
virsh net-update default add ip-dhcp-host \
          "<host mac='52:54:00:00:00:01' \
           name='bob' ip='192.168.122.45' />" \
           --live --config
```

Reference:
<https://serverfault.com/questions/443147/kvm-virtual-machine-unable-to-access-internet>
<https://wiki.libvirt.org/page/Networking>
