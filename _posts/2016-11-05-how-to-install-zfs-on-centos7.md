---
id: 89
title: How to install zfs on CentOS7
date: 2016-11-05T00:16:55+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=89
permalink: /2016/11/05/how-to-install-zfs-on-centos7/
categories:
  - CentOS
  - Linux
tags:
  - centos
  - zfs
  - zpool
---
1. Install epel-release and setup zfs repository.

<pre class="prettyprint">sudo yum -y install epel-release
sudo yum localinstall --nogpgcheck http://archive.zfsonlinux.org/epel/zfs-release.el7.noarch.rpm
</pre>

2. update and reboot

<pre class="prettyprint">sudo yum -y update
sudo shutdown -r now
</pre>

3. install kernel-dev zfs
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo yum install kernel-devel zfs
$ sudo modprobe zfs
$ sudo lsmod |grep zfs
zfs 2713912 4
zunicode 331170 1 zfs
zavl 15236 1 zfs
zcommon 55411 1 zfs
znvpair 93227 2 zfs,zcommon
spl 92223 3 zfs,zcommon,znvpair

</pre>

4. create a zpool

<pre class="prettyprint">$ ls /dev/vd*
/dev/vda  /dev/vda1  /dev/vda2  /dev/vdb  /dev/vdb1  /dev/vdb9
$ sudo zpool create -f &lt;pool name&gt; /dev/vdb
</pre>

5. add a new disk to zpool (This disk cannot be removed after add. Only spare disk can be removed)

<pre class="prettyprint">$ ls /dev/vd*
/dev/vda  /dev/vda1  /dev/vda2  /dev/vdb  /dev/vdb1  /dev/vdb9 /dev/vdc
$ sudo zpool add&lt;pool name&gt; /dev/vdc
</pre>

NOTE: if zpool cannot be mounted automatically after reboot, running the following command can fix it.

<pre class="prettyprint">sudo systemctl preset zfs-import-cache zfs-import-scan zfs-mount zfs-share zfs-zed zfs.target</pre>