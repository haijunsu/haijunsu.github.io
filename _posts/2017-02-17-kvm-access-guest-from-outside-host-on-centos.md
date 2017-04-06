---
id: 371
title: KVM access guest from outside host on CentOS
date: 2017-02-17T14:52:19+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=371
permalink: /2017/02/17/kvm-access-guest-from-outside-host-on-centos/
categories:
  - CentOS
  - Linux
tags:
  - centos
  - forwardng
  - guest
  - host
  - KVM
  - route
  - virsh
---
For default virbr0, it provides a way to help guest to access host (VM<&#8211;>host). But the guest cannot be accessed from outside host. But we can use the following commands to enable it temporally.
  
<!--?prettify linenums=true?-->

<pre class="prettyprint"># iptables -D  FORWARD -o virbr0 -j REJECT --reject-with icmp-port-unreachable
# iptables -D  FORWARD -i virbr0 -j REJECT --reject-with icmp-port-unreachable
</pre>

The best way is to create another bridge for guest.

  1. create new bridge xml file (routeNetwork.xml)
  
    <!--?prettify linenums=true?--></p> 
    
    <pre class="prettyprint">&lt;network&gt;
  &lt;name&gt;examplenetwork&lt;/name&gt;
  &lt;bridge name="virbr100" /&gt;
  &lt;forward mode="route" /&gt;
  &lt;ip address="10.10.120.1" netmask="255.255.255.0" /&gt;
&lt;/network&gt;</pre>

  2. create new bridge<!--?prettify linenums=true?-->
    
    <pre class="prettyprint"># virsh net-create routeNetwork.xml</pre>

  3. edit the bridge to enable dhcp (I think if we define DHCP at the first step, no need this one. If we don&#8217;t do this step, the persistent state is no. Not sure what the impact is.) <pre class="prettyprint"># virsh net-edit routenetwork

&lt;network&gt;
  &lt;name&gt;routenetwork&lt;/name&gt;
  &lt;uuid&gt;62b9b9a9-2865-466c-9a3d-ab003441bc8b&lt;/uuid&gt;
  &lt;forward mode='route'/&gt;
  &lt;bridge name='virbr100' stp='on' delay='0'/&gt;
  &lt;mac address='52:54:00:cc:3b:aa'/&gt;
  &lt;ip address='10.10.120.1' netmask='255.255.255.0'&gt;
    &lt;dhcp&gt;
      &lt;range start='10.10.120.128' end='10.10.120.254'/&gt;
    &lt;/dhcp&gt;
  &lt;/ip&gt;
&lt;/network&gt;</pre>

  4. Set the bridge autostart<!--?prettify linenums=true?-->
    
    <pre class="prettyprint"># virsh net-autostart routenetwork</pre>

  5. Check virtual networks<!--?prettify linenums=true?-->
    
    <pre class="prettyprint"># virsh net-list
 Name                 State      Autostart     Persistent
----------------------------------------------------------
 default              active     yes           yes
 routenetwork         active     yes           yes
</pre>

  6. add masquerade to firewalld<!--?prettify linenums=true?-->
    
    <pre class="prettyprint"># firewall-cmd --permanent --add-masquerade</pre>

  7. <!--?prettify linenums=true?-->change guest network type 
    
    <pre class="prettyprint"># virsh --connect qemu:///system
virsh # edit &lt;VM's name&gt;
...
&lt;interface type='bridge'&gt;
  &lt;mac address='52:54:00:ea:98:1a'/&gt;
  &lt;source bridge='virbr100'/&gt;
  &lt;model type='e1000'/&gt;
  &lt;address type='pci' domain='0x0000' bus='0x00' slot='0x03' function='0x0'/&gt;
&lt;/interface&gt;
...
</pre>

  8. shutdown and start the guest again
  9. add route on your router<!--?prettify linenums=true?-->
    
    <pre class="prettyprint"># sudo route -n add 10.10.120.0/24 &lt;host ip&gt;</pre>
    
    Now the guest can access from your network via it ip 10.10.120.x.
    
    Other <strong class="application">virsh</strong> commands used in managing virtual networks are:
    
    <div class="itemizedlist">
      <ul>
        <li>
          <code class="command">virsh net-list</code> — list virtual networks
        </li>
        <li>
          <code class="command">virsh net-autostart &lt;em class="replaceable">&lt;code>[network name]</code></em></code> — Autostart a network specified as [network name]
        </li>
        <li>
          <code class="command">virsh net-create &lt;em class="replaceable">&lt;code>[XML file]</code></em></code> — Generates and starts a new network using a preexisting XML file
        </li>
        <li>
          <code class="command">virsh net-define &lt;em class="replaceable">&lt;code>[XML file]</code></em></code> — Generates a new network from a preexisting XML file without starting it
        </li>
        <li>
          <code class="command">virsh net-destroy &lt;em class="replaceable">&lt;code>[network name]</code></em></code> — Destroy a network specified as [network name]
        </li>
        <li>
          <code class="command">virsh net-name &lt;em class="replaceable">&lt;code>[network UUID]</code></em></code> — Convert a specified [network UUID] to a network name
        </li>
        <li>
          <code class="command">virsh net-uuid &lt;em class="replaceable">&lt;code>[network name</code></em></code> — Convert a specified [network name] to a network UUID
        </li>
        <li>
          <code class="command">virsh net-start &lt;em class="replaceable">&lt;code>[name of an inactive network]</code></em></code> — Starts a previously undefined inactive network
        </li>
        <li>
          <code class="command">virsh net-undefine &lt;em class="replaceable">&lt;code>[name of an inactive network]</code></em></code> — Undefine an inactive network
        </li>
        <li>
          <code class="command">virsh net-dumpxml &lt;em class="replaceable">&lt;code>[network name]</code></em></code> — Dump network as xml file
        </li>
      </ul>
    </div>