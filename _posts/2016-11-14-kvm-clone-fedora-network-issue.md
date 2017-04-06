---
id: 179
title: KVM clone Fedora network issue
date: 2016-11-14T16:04:20+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=179
permalink: /2016/11/14/kvm-clone-fedora-network-issue/
categories:
  - Fedora
  - Linux
tags:
  - clone
  - dhcp
  - Fedora
  - KVM
  - linux
  - network
---
After clone Fedora 24 VM, the is a network issue:

<pre class="prettyprint">$ sudo systemctl restart network
Job for network.service failed because the control process exited with error code. See "systemctl status network.service" and "journalctl -xe" for details.

$ journalctl -xe
...
Nov 14 15:59:07 localhost NetworkManager[818]: &lt;info>  [1479157147.5419] audit: op="connection-activate" uuid="123dd488-4e5a-3420-952d-c6e63dff7c21"
Nov 14 15:59:07 localhost network[1389]: Bringing up interface ens3:  Error: Connection activation failed: No suitable device found for this connect
Nov 14 15:59:07 localhost network[1389]: [FAILED]
...
</pre>

Root cause: The old network device doesn&#8217;t exist anymore. During clone, a new network device is added.

Solution:

Delete old network profile. (ex. old interface is ens3)
  
<?prettify linenums=true?>

<pre class="prettyprint">$ sudo rm /etc/sysconfig/network-scripts/ifcfg-ens3
</pre>

Using Network Manger tool (nmcli, nmtui) to config network again.