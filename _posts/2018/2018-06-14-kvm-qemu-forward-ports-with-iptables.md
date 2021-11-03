---
title: KVM Qemu Forward Ports with iptables
author: Haijun (Navy) Su
layout: post
tags: [iptables, kvm, forward]
---
Forward rule:
```
sudo iptables -I FORWARD -o virbr0 -d 192.168.122.0/24 -j ACCEPT
```

Guest IP is 193.168.122.249
```
iptables -t nat -I PREROUTING -p tcp --dport 9867 -j DNAT --to 192.168.122.249:22
```


Reference:
<https://aboullaite.me/kvm-qemo-forward-ports-with-iptables/>
