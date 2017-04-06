---
id: 183
title: Using KVM on CentOS7
date: 2016-11-15T15:06:13+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=183
permalink: /2016/11/15/using-kvm-on-centos7/
categories:
  - CentOS
  - Linux
tags:
  - centos
  - KVM
  - linux
---
1. Install CentOS7 with Virtualization Host feature
  
<img class="alignnone wp-image-184 size-full" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/centos7-virtualization1.png?fit=840%2C623" alt="centos7-virtualization1" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/centos7-virtualization1.png?w=1018 1018w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/centos7-virtualization1.png?resize=300%2C222 300w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/centos7-virtualization1.png?resize=768%2C570 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 1362px) 62vw, 840px" data-recalc-dims="1" />

The Virtualization Host doesn&#8217;t install the virt-install and virt-manager. Run the following command to install them.

<pre class="prettyprint">$ sudo yum install virt-install virt-manager</pre>

Also you can install KVM by following command if you didn&#8217;t install Virtualization Host feature.

<pre class="prettyprint">$ sudo yum install kvm virt-manager libvirt virt-install qemu-kvm xauth dejavu-lgc-sans-fonts
</pre>

2. check kvm module installation

<pre class="prettyprint">$ lsmod|grep kvm
kvm_intel             162153  110
kvm                   525409  1 kvm_intel</pre>

3. Setup X server and run virt-manager

<pre class="prettyprint">$ DISPLAY=149.4.68.230:0.0
$ export DISPLAY
$ sudo virt-manager</pre>

5. KVM cli examples<!--?prettify linenums=true?-->

<pre class="prettyprint">// check cpu info
$ egrep -c '(vmx|svm)' /proc/cpuinfo</pre>

<pre class="prettyprint">// list templates
$ osinfo-query os</pre>

<pre class="prettyprint">// list VMs
$ sudo virsh --connect qemu:///system list
$ sudo virsh --connect qemu:///system list --all
</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">// show guest infomration
$ sudo virsh dominfo Fedora24
Id:             -
Name:           Fedora24
UUID:           d1e8dd90-54fb-46ee-92af-dad8ec914b2e
OS Type:        hvm
State:          shut off
CPU(s):         2
Max memory:     4194304 KiB
Used memory:    0 KiB
Persistent:     yes
Autostart:      disable
Managed save:   no
Security model: selinux
Security DOI:   0
</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">// shutdown
$ sudo virsh --connect qemu:///system shutdown Fedora24
// force stop
$ sudo virsh --connect qemu:///system destroy Fedora24
// start
$ sudo virsh --connect qemu:///system start Fedora24
</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">// delete guest
$ sudo virsh --connect qemu:///system destroy Fedora24
$ sudo virsh --connect qemu:///system undefine Fedora24
$ sudo rm -f /var/lib/libvirt/images/Fedora24.img
$ sudo virsh pool-refresh default
</pre>

<!--?prettify linenums=true?-->6. Autostart guest

<pre class="prettyprint">// autostart guest
$ sudo virsh --connect qemu:///system autostart Fedora24
$ sudo virsh --connect qemu:///system dominfo Fedora24|grep Auto
</pre>

Set auto start from GUI

<img class="alignnone wp-image-187 size-large" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/KVM-autostart-1024x861.png?fit=840%2C706" alt="kvm-autostart" srcset="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/KVM-autostart.png?resize=1024%2C861 1024w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/KVM-autostart.png?resize=300%2C252 300w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/KVM-autostart.png?resize=768%2C646 768w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/KVM-autostart.png?w=1031 1031w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 1362px) 62vw, 840px" data-recalc-dims="1" />

7. Issues

a) Using samba share file failed. Report permission denied. Copy install iso images to local and it works fine

b) After clone a VM from GUI, cannot start and report missing the folder such as Fedora24-template which is the source VM name. Created a tool to check the folder.  If the folder is gone, the tool creates it immediately.

Reference: <http://jensd.be/207/linux/install-and-use-centos-7-as-kvm-virtualization-host>