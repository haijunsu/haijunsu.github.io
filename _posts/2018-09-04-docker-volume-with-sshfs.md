---
title: Docker Volume with SSHFS
author: Haijun (Navy) Su
layout: post
tags: [docker, sshfs, volume]
---

**Using an ssh key**

* Install plugin
```shell
$ docker plugin install vieux/sshfs sshkey.source=/home/<user>/.ssh/

# or to enable debug
docker plugin install vieux/sshfs DEBUG=1 sshkey.source=/home/<user>/.ssh/

# or to change where plugin state is stored
docker plugin install vieux/sshfs state.source=<any_folder> sshkey.source=/home/<user>/.ssh/
```

* Create docker volume
```shell
docker volume create -d vieux/sshfs -o sshcmd=<user@host:path> [-o IdentityFile=/root/.ssh/<key>] [-o port=<port>] [-o <any_sshfs_-o_option> ] sshvolume
```

* Use the volume
```shell
$ docker run -it -v sshvolume:<path> busybox ls <Paste>
```


Reference: <https://github.com/vieux/docker-volume-sshfs>
