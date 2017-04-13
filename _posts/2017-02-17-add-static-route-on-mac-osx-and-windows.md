---
id: 383
title: Add static route on Mac OSX and Windows
date: 2017-02-17T16:16:32+00:00
author: Navy Su
layout: post
---
Add static route on windows is very easy. Run command prompt as Administrator.
  


```bash
route -p add 10.10.120.0 mask 255.255.255.0 192.168.0.1
```

Add static route on OS x, need the following steps

  1. Find the network service which can access gateway
    
```bash
mac-mini:~ ladmin$ networksetup -listallnetworkservices

An asterisk (*) denotes that a network service is disabled.

Internet

LAN

Backup-LAN

Bluetooth DUN

*FireWire

*Bluetooth PAN 2

Wi-Fi

 

mac-mini:~ ladmin$ networksetup -getinfo LAN

Manual Configuration

IP address: 192.168.15.2

Subnet mask: 255.255.255.0

Router: 192.168.15.254

IPv6: Automatic

IPv6 IP address: none

IPv6 Router: none

Ethernet Address: 00:1f:5b:33:1d:75
```

  2. set additional gateway on the network service
    
```bash
mac-mini:~ ladmin$ sudo networksetup -setadditionalroutes LAN 10.0.0.0 255.255.255.0 192.168.15.254

Password:

mac-mini:~ ladmin$ networksetup -getadditionalroutes LAN

10.0.0.0 255.255.255.0 192.168.15.254
```

  3. Check the route list
  
     
    
```bash
mac-mini:~ ladmin$ netstat -rn

Routing tables

 

Internet:

Destination        Gateway            Flags        Refs      Use   Netif Expire

default            213.125.227.185    UGSc           18        0   vlan0

default            192.168.15.254     UGScI           0        0     en0

default            192.168.15.254     UGScI           0        0     en1

default            192.168.15.254     UGScI           0        0     en2

10/24              192.168.15.254     UGSc            0        0     en1

127                127.0.0.1          UCS             0        0     lo0

127.0.0.1          127.0.0.1          UH             75  2330825     lo0

169.254            link#8             UCS             1        0   vlan0

169.254            link#4             UCSI            0        0     en0

169.254            link#5             UCSI            0        0     en1


```
    
    Add more routing paths:
  
    
    
```bash
iso@isoAir:/dev$ sudo networksetup -setadditionalroutes “Ethernet Pantalla Trabajo” 10.0.0.0 255.0.0.0 10.1.36.1 172.16.0.0 255.240.0.0 10.1.36.1 192.168.0.0 255.255.0.0 10.1.36.1

iso@isoAir:/dev$ sudo networksetup -getadditionalroutes “Ethernet Pantalla Trabajo”

10.0.0.0 255.0.0.0 10.1.36.1

172.16.0.0 255.240.0.0 10.1.36.1

192.168.0.0 255.255.0.0 10.1.36.1


```
    
    reference:
    
    <http://www.marcoach.nl/persistent-static-routes-on-os-x/>
    
    [https://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/sag\_tcpip\_pro_addstaticroute.mspx?mfr=true](https://www.microsoft.com/resources/documentation/windows/xp/all/proddocs/en-us/sag_tcpip_pro_addstaticroute.mspx?mfr=true)</li> </ol>