---
id: 365
title: How to edit KVM VM profile which is created by virt-manager and add port-forwarding function?
date: 2017-02-16T16:34:42+00:00
author: Navy Su
layout: post
---
Virt-manager hides some functions such as port-forwarding. We can edit the VM profile form terminal.

```bash
# virsh --connect qemu:///system
```

List all VMs in virsh envrionment
  

```bash
virsh # list --all
```

Edit VM&#8217;s profile
  

```bash
virsh # edit &lt;VM's name&gt;
```

Add qemu namespace 

```bash
old:
&lt;domain type='kvm'&gt;
new:
&lt;domain type='kvm' xmlns:qemu='http://libvirt.org/schemas/domain/qemu/1.0'&gt;

```

Change network type from network to user

```bash
old:
   &lt;interface type='network'&gt;
      &lt;mac address='xx:xx:xx:xx:xx:xx'/&gt;
      &lt;model type='e1000'/&gt;
      &lt;source network='default'/&gt;
      &lt;address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/&gt;
    &lt;/interface&gt;
new:
  &lt;interface type='user'&gt;
    &lt;mac address='xx:xx:xx:xx:xx:xx'/&gt;
    &lt;model type='e1000'/&gt;
    &lt;address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/&gt;
  &lt;/interface&gt;

```

Add port-forwarding arguments before tag </domain>
  

```bash
&lt;qemu:commandline&gt;
    &lt;qemu:arg value='-redir'/&gt;
    &lt;qemu:arg value='tcp:2001::3389'/&gt;
    &lt;qemu:arg value='-redir'/&gt;
    &lt;qemu:arg value='tcp:2002::80'/&gt;
&lt;/qemu:commandline&gt;
```

&nbsp;

&nbsp;