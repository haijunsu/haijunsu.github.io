---
id: 144
title: Change hostname on CentOS/Fedora
date: 2016-11-10T00:05:33+00:00
author: Navy Su
layout: post
---
<?prettify linenums=true?>

```bash
$ sudo hostnamectl set-hostname --static "YOUR-HOSTNAME-HERE"

```

If the hostname cannot be saved on Fedora after reboot, using the following command to fix it.
  
<?prettify linenums=true?>

```bash
$ sudo restorecon -v /etc/hostname

```

This works on CentOS

```bash
$ sudo vi /etc/sysconfig/network

HOSTNAME=myserver.domain.com

$ sudo vi /etc/hosts

$ sudo vi /etc/hostname
```