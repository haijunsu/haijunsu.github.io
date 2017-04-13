---
id: 371
title: KVM access guest from outside host on CentOS
date: 2017-02-17T14:52:19+00:00
author: Navy Su
layout: post
---
For default virbr0, it provides a way to help guest to access host (VM<&#8211;>host). But the guest cannot be accessed from outside host. But we can use the following commands to enable it temporally.
  

```bash
# iptables -D  FORWARD -o virbr0 -j REJECT --reject-with icmp-port-unreachable
# iptables -D  FORWARD -i virbr0 -j REJECT --reject-with icmp-port-unreachable
```

The best way is to create another bridge for guest.

  1. create new bridge xml file (routeNetwork.xml)
```bash
<network>
  <name>examplenetwork</name>
  <bridge name="virbr100" />
  <forward mode="route" />
  <ip address="10.10.120.1" netmask="255.255.255.0" />
</network>
```

  2. create new bridge
```bash
# virsh net-create routeNetwork.xml
```

  3. edit the bridge to enable dhcp (I think if we define DHCP at the first step, no need this one. If we don&#8217;t do this step, the persistent state is no. Not sure what the impact is.)
```bash
# virsh net-edit routenetwork
<network>
  <name>routenetwork</name>
  <uuid>62b9b9a9-2865-466c-9a3d-ab003441bc8b</uuid>
  <forward mode='route'/>
  <bridge name='virbr100' stp='on' delay='0'/>
  <mac address='52:54:00:cc:3b:aa'/>
  <ip address='10.10.120.1' netmask='255.255.255.0'>
    <dhcp>
      <range start='10.10.120.128' end='10.10.120.254'/>
    </dhcp>
  </ip>
</network>
```

  4. Set the bridge autostart
    
```bash
# virsh net-autostart routenetwork
```

  5. Check virtual networks
    
```bash
# virsh net-list

 Name                 State      Autostart     Persistent
----------------------------------------------------------
 default              active     yes           yes
 routenetwork         active     yes           yes
```

  6. add masquerade to firewalld
```bash
# firewall-cmd --permanent --add-masquerade
```

  7. change guest network type 
```bash
# virsh --connect qemu:///system
virsh # edit <VM's name>
...
<interface type='bridge'>
  <mac address='52:54:00:ea:98:1a'/>
  <source bridge='virbr100'/>
  <model type='e1000'/>
  <address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/>
</interface>
...
```

  8. shutdown and start the guest again
  9. add route on your router
```bash
# sudo route -n add 10.10.120.0/24 <host ip>
```
    
    Now the guest can access from your network via it ip 10.10.120.x.
    
    Other **virsh** commands used in managing virtual networks are:
        
 * virsh net-list — list virtual networks
 * virsh net-autostart [network name] — Autostart a network specified as [network name]
 * virsh net-create [XML file] — Generates and starts a new network using a preexisting XML file
 * virsh net-define [XML file] — Generates a new network from a preexisting XML file without starting it
 * virsh net-destroy [network name] — Destroy a network specified as [network name]
 * virsh net-name [network UUID] — Convert a specified [network UUID] to a network name
 * virsh net-uuid [network name — Convert a specified [network name] to a network UUID
 * virsh net-start [name of an inactive network] — Starts a previously undefined inactive network
 * virsh net-undefine [name of an inactive network] — Undefine an inactive network
 * virsh net-dumpxml [network name] — Dump network as xml file
        
