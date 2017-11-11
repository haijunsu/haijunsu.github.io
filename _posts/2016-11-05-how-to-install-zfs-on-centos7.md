---
id: 89
title: How to install zfs on CentOS7
date: 2016-11-05T00:16:55+00:00
author: Navy Su
layout: post
---
1. Install epel-release and setup zfs repository.

~~~shell
sudo yum -y install epel-release

sudo yum localinstall --nogpgcheck http://archive.zfsonlinux.org/epel/zfs-release.el7.noarch.rpm

~~~

2. update and reboot

~~~shell
sudo yum -y update

sudo shutdown -r now

~~~

3. install kernel-dev zfs
  

~~~shell
$ sudo yum install kernel-devel zfs

$ sudo modprobe zfs

$ sudo lsmod |grep zfs

zfs 2713912 4

zunicode 331170 1 zfs

zavl 15236 1 zfs

zcommon 55411 1 zfs

znvpair 93227 2 zfs,zcommon

spl 92223 3 zfs,zcommon,znvpair

~~~

4. create a zpool

~~~shell
$ ls /dev/vd*

/dev/vda  /dev/vda1  /dev/vda2  /dev/vdb  /dev/vdb1  /dev/vdb9

$ sudo zpool create -f <pool name> /dev/vdb

~~~

5. add a new disk to zpool (This disk cannot be removed after add. Only spare disk can be removed)

~~~shell
$ ls /dev/vd*

/dev/vda  /dev/vda1  /dev/vda2  /dev/vdb  /dev/vdb1  /dev/vdb9 /dev/vdc

$ sudo zpool add<pool name> /dev/vdc

~~~

NOTE: if zpool cannot be mounted automatically after reboot, running the following command can fix it.

~~~shell
sudo systemctl preset zfs-import-cache zfs-import-scan zfs-mount zfs-share zfs-zed zfs.target
~~~