---
title: How to set metric in OS moderated with NetworkManager
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, network, metric, route, networkmanager]
---

Ubuntu 20.04 desktop is using NetworkManager. Here is how to change the metric on CLI.

### List connections

```shell
~  sudo nmcli connection                                                                                                                                                                                      
NAME                UUID                                  TYPE      DEVICE
Wired connection 1  72375b91-f2de-3578-9d67-53a858274d98  ethernet  enp1s0  
br-880ef0d795b5     8cc8bc46-b993-48fe-a0cd-fcd79d3d1219  bridge    br-880ef0d795b5
br-9d2f41504a75     5e5f7b3b-75a4-440f-b9b5-e7daf9654745  bridge    br-9d2f41504a75
Wired connection 2  fbe3615c-f9ab-3330-8f06-6e53a6cc8d25  ethernet  enp2s0 
docker0             0d1615ea-e595-477c-b92d-584274f7df7e  bridge    docker0  
```

### Edit connection by name

```shell
~  sudo nmcli connection edit "Wired connection 1" 
===| nmcli interactive connection editor |=== 

Editing existing '802-3-ethernet' connection: 'Wired connection 1'

Type 'help' or '?' for available commands. 
Type 'print' to show all the connection properties. 
Type 'describe [<setting>.<prop>]' for detailed property description.  
    
You may edit the following settings: connection, 802-3-ethernet (ethernet), 802-1x, dcb, sriov, ethtool, match, ipv4, ipv6, tc, proxy   
nmcli> set ipv4.route-metric 500 
nmcli> save   
Connection 'Wired connection 1' (72375b91-f2de-3578-9d67-53a858274d98) successfully updated.  
nmcli> quit    
```

### Restart NetworkManager

```shell
~  sudo systemctl restart NetworkManager 
```

### Check results

```shell
~  ip r 
default via 192.168.122.1 dev enp1s0 proto dhcp metric 100                                                 
default via 192.168.68.254 dev enp2s0 proto dhcp metric 101                                                  
default via 192.168.122.1 dev enp1s0 proto dhcp metric 500                                                 
192.168.68.0/24 dev enp2s0 proto kernel scope link src 192.168.68.219 metric 101                               
169.254.0.0/16 dev enp1s0 scope link metric 1000                                                           
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown                                  
172.18.0.0/16 dev br-9d2f41504a75 proto kernel scope link src 172.18.0.1                                   
192.168.49.0/24 dev br-880ef0d795b5 proto kernel scope link src 192.168.49.1                               
192.168.122.0/24 dev enp1s0 proto kernel scope link src 192.168.122.19 metric 100                          
192.168.122.0/24 dev enp1s0 proto kernel scope link src 192.168.122.19 metric 500 
```

The routes for 192.168.122.1 are duplicated. After disable the device `enp1s0` and re-enable it, problem solved.


### Reference
<https://dev.to/emamirazavi/how-to-set-metric-in-networkmanager-system-4525>
