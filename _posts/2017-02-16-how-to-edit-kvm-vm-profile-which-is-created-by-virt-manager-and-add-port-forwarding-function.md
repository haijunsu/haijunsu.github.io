---
id: 365
title: How to edit KVM VM profile which is created by virt-manager and add port-forwarding function?
date: 2017-02-16T16:34:42+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=365
permalink: /2017/02/16/how-to-edit-kvm-vm-profile-which-is-created-by-virt-manager-and-add-port-forwarding-function/
categories:
  - CentOS
  - Linux
tags:
  - forwarding
  - KVM
  - network
  - port
  - virt
  - vm
---
Virt-manager hides some functions such as port-forwarding. We can edit the VM profile form terminal.

<pre class="prettyprint"># virsh --connect qemu:///system</pre>

List all VMs in virsh envrionment
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">virsh # list --all</pre>

Edit VM&#8217;s profile
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">virsh # edit &lt;VM's name&gt;</pre>

Add qemu namespace <!--?prettify linenums=true?-->

<pre class="prettyprint">old:
&lt;domain type='kvm'&gt;
new:
&lt;domain type='kvm' xmlns:qemu='http://libvirt.org/schemas/domain/qemu/1.0'&gt;
</pre>

Change network type from network to user

<pre class="prettyprint">old:
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
</pre>

Add port-forwarding arguments before tag </domain>
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">&lt;qemu:commandline&gt;
    &lt;qemu:arg value='-redir'/&gt;
    &lt;qemu:arg value='tcp:2001::3389'/&gt;
    &lt;qemu:arg value='-redir'/&gt;
    &lt;qemu:arg value='tcp:2002::80'/&gt;
&lt;/qemu:commandline&gt;</pre>

&nbsp;

&nbsp;