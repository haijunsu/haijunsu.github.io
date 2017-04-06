---
id: 200
title: Using LXD on Ubuntu 16.04
date: 2016-11-17T16:30:43+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=200
permalink: /2016/11/17/using-lxd-on-ubuntu-16-04/
categories:
  - Linux
  - LXD
  - Ubuntu
tags:
  - linux
  - lxc
  - lxd
  - ubuntu
---
1. install lxd

<pre class="prettyprint">$ sudo apt install lxd</pre>

2. Enable swap accounting
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo vi /etc/default/grub
GRUB_CMDLINE_LINUX_DEFAULT="swapaccount=1"
$ sudo update-grub
$ sudo shutdown -r now
</pre>

3. create lxd user
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo useradd -s /bin/bash -m lxdadm
$ sudo passwd lxdadm
$ sudo adduser lxdadm lxd</pre>

4. init lxd
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo lxd init</pre>

5. Creating the first container
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo su - lxdadm
$ newgrp lxd

// create container ubuntu16
$ lxc launch ubuntu:xenial ubuntu16

// list lxc containers
$ lxc list
$ lxc info ubuntu16

// open a shell in ubuntu16
$ lxc exec ubuntu16 bash
</pre>

6. Create container without starting it
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc init ubuntu:xenial ubuntu16</pre>

6. List images
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc image list
$ lxc image list images:
$ lxc image list ubuntu:
</pre>

7. List containers
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc list
$ lxc list --fast
$ lxc info &lt;container&gt;
</pre>

8. Start/stop a container
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc start 
$ lxc stop &lt;container&gt;
$ lxc stop  &lt;container&gt; --force
$ lxc restart &lt;containter&gt;
$ lxc restart &lt;container&gt; --force
$ lxc pause &lt;container&gt;
</pre>

9. Profiles
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc profile list
$ lxc profile show &lt;profile&gt;
$ lxc profile edit &lt;profile&gt;
$ lxc profile apply &lt;container&gt; &lt;profile1&gt;,&lt;profile2&gt;,...
</pre>

10. Shell
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc exec &lt;container&gt; bash
$ lxc exec &lt;container&gt; -- ls -lh /
$ lxc exec &lt;container&gt; --env mykey=myvalue
</pre>

11. Files
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc file pull &lt;container&gt;/&lt;path&gt; &lt;dest&gt;
$ lxc file pull &lt;container&gt;/&lt;path&gt; - //read file to standard output
$ lxc file push &lt;source&gt; &lt;container&gt;/&lt;path&gt;
$ lxc file edit &lt;container&gt;/&lt;path&gt;
</pre>

11. Snapshot
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc snapshot &lt;container&gt;
$ lxc snapshot &lt;container&gt; &lt;snapshot name&gt;
$ lxc info &lt;container&gt; //see snapshot
$ lxc restore &lt;container&gt; &lt;snapshot name&gt;
$ lxc move &lt;container&gt;/&lt;snapshot name&gt; &lt;container&gt;/&lt;new snapshot name&gt;
$ lxc delete &lt;container&gt;/&lt;snapshot name&gt;
</pre>

12. Cloning/renaming/delting
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc copy &lt;source container&gt; &lt;destination container&gt; 
$ lxc move &lt;old name&gt; &lt;new name&gt;  
$ lxc delete &lt;container&gt;
</pre>

13. CPU limit

<pre class="prettyprint">$ lxc config set my-container limits.cpu 2  //any 2 cpus

$ lxc config set my-container limits.cpu 1,3 // cpu #2 #4

$ lxc config set my-container limits.cpu 0-3,7-11

$ lxc config set my-container limits.cpu.allowance 10% // limit time 10% of total

$ lxc config set my-container limits.cpu.priority 0</pre>

14. Memory limit<!--?prettify linenums=true?-->

<pre class="prettyprint">$ lxc config set my-container limits.memory 256MB</pre>

15. Disk limit (requires btrfs or ZFS)

<pre class="prettyprint">$ lxc config device set my-container root size 20GB</pre>

16. IO reading/writing limits

<pre class="prettyprint">$ lxc config device set my-container root limits.read 20Iops
$ lxc config device set my-container root limits.write 10Iops</pre>

17. Autostart container

<pre class="prettyprint">$ lxc config set container_name boot.autostart 1</pre>

18. Mount host directory
  
<?prettify linenums=true?>

<pre class="prettyprint">$ lxc config device add container_name device_name disk source=host_directory path=guest_directory</pre>