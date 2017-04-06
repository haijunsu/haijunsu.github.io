---
id: 198
title: Install zfs on ubuntu
date: 2016-11-17T11:56:13+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=198
permalink: /2016/11/17/install-zfs-on-ubuntu/
categories:
  - Linux
  - Ubuntu
tags:
  - linux
  - ubuntu
  - zfs
---
ZFS is only fully supported on 64 bit architectures from Ubuntu Xenial 16.04. ZFS is only supported for data storage, not the root system.

<pre class="prettyprint">sudo apt install zfsutils-linux</pre>

or<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo apt install zfs</pre>