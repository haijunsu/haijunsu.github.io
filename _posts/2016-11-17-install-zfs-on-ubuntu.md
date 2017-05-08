---
id: 198
title: Install zfs on ubuntu
date: 2016-11-17T11:56:13+00:00
author: Navy Su
layout: post
---
ZFS is only fully supported on 64 bit architectures from Ubuntu Xenial 16.04. ZFS is only supported for data storage, not the root system.

~~~bash
sudo apt install zfsutils-linux
~~~

or

~~~bash
sudo apt install zfs
~~~