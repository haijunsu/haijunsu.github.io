---
title: Remove old kernels on Linux
author: Navy Su
layout: post
---
=== Display current kernel
```
  $ uname -r
  $ uname -mrs
```
=== On ubuntu
* List all installed kernels
```
  $ dpkg --list | grep linux-image
```
* Remove old kernels
```
  $ sudo apt-get autoremove
```

=== On RedHat, CentOS, and Fedora
* list all installed kernels
```
  $ rpm -qa kernel
```
* Remove old kernels
```
  # install yum utils
  $ dnf install yum-utils
  $ yum install yum-utils
  # Package-cleanup set count as how many old kernels you want left 
  $ package-cleanup --oldkernels --count=2
```
* Make amount of installed kernels permanent
Edit /etc/yum.conf or /etc/dnf/dnf.conf and set installonly_limit:
```
  installonly_limit=2
```
