---
title: How to Create Bootable USB Key CentOS7
author: Haijun (Navy) Su
layout: post
---
From a Linux System
~~~bash
dd if=CentOS-7.0-1406-x86_64-DVD.iso of=/dev/sdb
~~~
**Note:** /dev/sdb is the USB key!

From a Mac OSX
~~~bash
dd if=CentOS-7.0-1406-x86_64-DVD.iso of=/dev/diskXYZ bs=1m
~~~
**Note:** /dev/diskXYZ is the USB key!

Reference: <https://www.linuxunit.com/how-to-create-bootable-usb-key-centos7/>
