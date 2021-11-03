---
id: 200
title: Using LXD on Ubuntu 16.04
date: 2016-11-17T16:30:43+00:00
author: Navy Su
layout: post
tags: [ubuntu, lxc, lxd]
---

1. install lxd

```shell
$ sudo apt install lxd
```

2. Enable swap accounting
  
~~~shell
$ sudo vi /etc/default/grub

GRUB_CMDLINE_LINUX_DEFAULT="swapaccount=1"

$ sudo update-grub

$ sudo shutdown -r now

~~~

3. create lxd user

~~~shell
$ sudo useradd -s /bin/bash -m lxdadm

$ sudo passwd lxdadm

$ sudo adduser lxdadm lxd
~~~

4. init lxd

~~~shell
$ sudo lxd init
~~~

5. Creating the first container

~~~shell
$ sudo su - lxdadm

$ newgrp lxd

// create container ubuntu16

$ lxc launch ubuntu:xenial ubuntu16

// list lxc containers

$ lxc list

$ lxc info ubuntu16

// open a shell in ubuntu16

$ lxc exec ubuntu16 bash

~~~

6. Create container without starting it

~~~shell
$ lxc init ubuntu:xenial ubuntu16
~~~

6. List images

~~~shell
$ lxc image list

$ lxc image list images:

$ lxc image list ubuntu:

~~~

7. List containers

~~~shell
$ lxc list

$ lxc list --fast

$ lxc info <container>

~~~

8. Start/stop a container

~~~shell
$ lxc start 

$ lxc stop <container>

$ lxc stop  <container> --force

$ lxc restart <containter>

$ lxc restart <container> --force

$ lxc pause <container>

~~~

9. Profiles

~~~shell
$ lxc profile list

$ lxc profile show <profile>

$ lxc profile edit <profile>

$ lxc profile apply <container> <profile1>,<profile2>,...

~~~

10. Shell

~~~shell
$ lxc exec <container> bash

$ lxc exec <container> -- ls -lh /

$ lxc exec <container> --env mykey=myvalue

~~~

11. Files

~~~shell
$ lxc file pull <container>/<path> <dest>

$ lxc file pull <container>/<path> - //read file to standard output

$ lxc file push <source> <container>/<path>

$ lxc file edit <container>/<path>

~~~

11. Snapshot

~~~shell
  $ lxc snapshot <container>

  $ lxc snapshot <container> <snapshot name>

  $ lxc info <container> //see snapshot

  $ lxc restore <container> <snapshot name>

  $ lxc move <container>/<snapshot name> <container>/<new snapshot name>

  $ lxc delete <container>/<snapshot name>

~~~

12. Cloning/renaming/delting

~~~shell
  $ lxc copy <source container> <destination container> 

  $ lxc move <old name> <new name>  

  $ lxc delete <container>

~~~

13. CPU limit

~~~shell
  $ lxc config set my-container limits.cpu 2  //any 2 cpus

  $ lxc config set my-container limits.cpu 1,3 // cpu #2 #4

  $ lxc config set my-container limits.cpu 0-3,7-11

  $ lxc config set my-container limits.cpu.allowance 10% // limit time 10% of total

  $ lxc config set my-container limits.cpu.priority 0
~~~

14. Memory limit

~~~shell
  $ lxc config set my-container limits.memory 256MB
~~~

15. Disk limit (requires btrfs or ZFS)

~~~shell
  $ lxc config device set my-container root size 20GB
~~~

16. IO reading/writing limits

~~~shell
  $ lxc config device set my-container root limits.read 20Iops

  $ lxc config device set my-container root limits.write 10Iops
~~~

17. Autostart container

~~~shell
  $ lxc config set container_name boot.autostart 1
~~~

18. Mount host directory
  
<?prettify linenums=true?>

~~~shell
  $ lxc config device add container_name device_name disk source=host_directory path=guest_directory
~~~

19. Assign static IP (Lxd 3.0)
```bash
  $ lxc stop my-c1
  $ network attach lxdbr0 my-c1 eth0 eth0
  $ lxc config device set my-c1 ipv4.address 10.204.140.10
  $ lxc start my-c1
```

20. IP Port forwarding (lxd 3.0)
``` bash
  # Forward host port 8080 to container c1 port 80
  $ lxc config device add my-ssh-proxy ci proxy listen=tcp:0.0.0.0:8080 connect=tcp:127.0.0.1:80
```
* connect to is container localhost ip.

