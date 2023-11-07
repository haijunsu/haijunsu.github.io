---
title: Enalbe docker in LXD5
author: Haijun (Navy) Su
layout: post
tags: [lxd, lxc, docker, ubuntu]
---

## Create LXD Container

**NOTE:** Docker will not run will with the default `zfs` file system

* Create a new `btrfs` storage pool called `docker`. The Btrfs is one of the storeage pools Docker support natively.

```bash
lxc storage create docker btrfs
```

* Create a new LXD instance and call it `demo`.

```bash
lxc launch images:ubuntu/22.04 demo
```

* Create a new storage volume on the `docker` storage pool.

```bash
lxc storage volume create docker docker-vol-demo
```

* Attach the volume to the `demo` container

```
lxc config device add demo docker disk pool=docker source=docker-vol-demo path=/var/lib/docker

# if you install docker with snap, the volume path should be /snap/docker. Use the one as below.
lxc config device add demo docker disk pool=docker source=docker-vol-demo path=/snap/docker
```

* Allow nested containers required for Docker

```bash
lxc config set demo security.nesting=true security.syscalls.intercept.mknod=true security.syscalls.intercept.setxattr=true

```

* Apply these chages by restarting the container.

```bash
lxc restart demo
```

## Install and verfy docker.

[Install Docker on Ubuntu](/install-docker-on-ubuntu/)

## Reference

[How to run Docker inside LXD containers](https://ubuntu.com/tutorials/how-to-run-docker-inside-lxd-containers#2-create-lxd-container)
