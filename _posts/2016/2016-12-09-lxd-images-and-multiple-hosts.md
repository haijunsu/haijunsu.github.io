---
id: 315
title: LXD images and multiple hosts
date: 2016-12-09T16:23:17+00:00
author: Navy Su
layout: post
---
Remote operations require the following two commands having been run on the remote server:

~~~shell
lxc config set core.https_address "[::]:8443"

lxc config set core.trust_password some-password
~~~

Add a remote server:

~~~shell
lxc remote add <server alias> <ip address or DNS>
~~~

And after that, use all the same command as above but prefixing the container and images name with the remote host like:
  

~~~shell
lxc exec host-a:first -- apt-get update
~~~

Manually import images example:

~~~shell
lxc image copy images:gentoo/current/amd64 local: --alias gentoo --auto-update

lxc image import <tarball> --alias random-image

lxc image import https://dl.stgraber.org/lxd --alias busybox-amd64
~~~

List images:

~~~shell
lxc image list

lxc image list <remote server alias>:
~~~

Editing image:

~~~shell
lxc image edit <alias or fingerprint>
~~~

Deleting image:

~~~shell
lxc image delete <alias or fingerprint>
~~~

Create you own image from a container:

~~~shell
lxc publish my-container/some-snapshot --alias some-image
~~~

Reference:
  
<a href="https://linuxcontainers.org/lxd/getting-started-cli/" target="_blank">Installing LXD and the command line tool</a>
  
<a href="https://www.stgraber.org/2016/03/30/lxd-2-0-image-management-512/" target="_blank">LXD 2.0: Image management [5/12]</a>