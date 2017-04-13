---
id: 315
title: LXD images and multiple hosts
date: 2016-12-09T16:23:17+00:00
author: Navy Su
layout: post
---
Remote operations require the following two commands having been run on the remote server:

```bash
lxc config set core.https_address "[::]:8443"

lxc config set core.trust_password some-password
```

Add a remote server:

```bash
lxc remote add &lt;server alias&gt; &lt;ip address or DNS&gt;
```

And after that, use all the same command as above but prefixing the container and images name with the remote host like:
  

```bash
lxc exec host-a:first -- apt-get update
```

Manually import images example:

```bash
lxc image copy images:gentoo/current/amd64 local: --alias gentoo --auto-update

lxc image import &lt;tarball&gt; --alias random-image

lxc image import https://dl.stgraber.org/lxd --alias busybox-amd64
```

List images:

```bash
lxc image list

lxc image list &lt;remote server alias&gt;:
```

Editing image:

```bash
lxc image edit &lt;alias or fingerprint&gt;
```

Deleting image:

```bash
lxc image delete &lt;alias or fingerprint&gt;
```

Create you own image from a container:

```bash
lxc publish my-container/some-snapshot --alias some-image
```

&nbsp;

&nbsp;

Reference:
  
<a href="https://linuxcontainers.org/lxd/getting-started-cli/" target="_blank">Installing LXD and the command line tool</a>
  
<a href="https://www.stgraber.org/2016/03/30/lxd-2-0-image-management-512/" target="_blank">LXD 2.0: Image management [5/12]</a>