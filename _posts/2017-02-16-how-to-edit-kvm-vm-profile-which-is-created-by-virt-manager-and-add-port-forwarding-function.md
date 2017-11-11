---
id: 365
title: How to edit KVM VM profile which is created by virt-manager and add port-forwarding function?
date: 2017-02-16T16:34:42+00:00
author: Navy Su
layout: post
---
Virt-manager hides some functions such as port-forwarding. We can edit the VM profile form terminal.

~~~shell
# virsh --connect qemu:///system
~~~

List all VMs in virsh envrionment
  

~~~shell
virsh # list --all
~~~

Edit VM&#8217;s profile
  

~~~shell
virsh # edit <VM's name>
~~~

Add qemu namespace 

~~~shell
old:
<domain type='kvm'>
new:
<domain type='kvm' xmlns:qemu='http://libvirt.org/schemas/domain/qemu/1.0'>

~~~

Change network type from network to user

~~~shell
old:
   <interface type='network'>
      <mac address='xx:xx:xx:xx:xx:xx'/>
      <model type='e1000'/>
      <source network='default'/>
      <address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/>
    </interface>
new:
  <interface type='user'>
    <mac address='xx:xx:xx:xx:xx:xx'/>
    <model type='e1000'/>
    <address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/>
  </interface>

~~~

Add port-forwarding arguments before tag </domain>
  

~~~shell
<qemu:commandline>
    <qemu:arg value='-redir'/>
    <qemu:arg value='tcp:2001::3389'/>
    <qemu:arg value='-redir'/>
    <qemu:arg value='tcp:2002::80'/>
</qemu:commandline>
~~~

