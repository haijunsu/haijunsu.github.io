---
id: 200
title: Using LXD on Ubuntu 16.04
date: 2016-11-17T16:30:43+00:00
author: Navy Su
layout: post
---
1. install lxd

```bash
$ sudo apt install lxd
```

2. Enable swap accounting
  


```bash
$ sudo vi /etc/default/grub

GRUB_CMDLINE_LINUX_DEFAULT="swapaccount=1"

$ sudo update-grub

$ sudo shutdown -r now


```

3. create lxd user
  


```bash
$ sudo useradd -s /bin/bash -m lxdadm

$ sudo passwd lxdadm

$ sudo adduser lxdadm lxd
```

4. init lxd
  


```bash
$ sudo lxd init
```

5. Creating the first container
  


```bash
$ sudo su - lxdadm

$ newgrp lxd



// create container ubuntu16

$ lxc launch ubuntu:xenial ubuntu16



// list lxc containers

$ lxc list

$ lxc info ubuntu16



// open a shell in ubuntu16

$ lxc exec ubuntu16 bash


```

6. Create container without starting it
  


```bash
$ lxc init ubuntu:xenial ubuntu16
```

6. List images
  


```bash
$ lxc image list

$ lxc image list images:

$ lxc image list ubuntu:


```

7. List containers
  


```bash
$ lxc list

$ lxc list --fast

$ lxc info &lt;container&gt;


```

8. Start/stop a container
  


```bash
$ lxc start 

$ lxc stop &lt;container&gt;

$ lxc stop  &lt;container&gt; --force

$ lxc restart &lt;containter&gt;

$ lxc restart &lt;container&gt; --force

$ lxc pause &lt;container&gt;


```

9. Profiles
  


```bash
$ lxc profile list

$ lxc profile show &lt;profile&gt;

$ lxc profile edit &lt;profile&gt;

$ lxc profile apply &lt;container&gt; &lt;profile1&gt;,&lt;profile2&gt;,...


```

10. Shell
  


```bash
$ lxc exec &lt;container&gt; bash

$ lxc exec &lt;container&gt; -- ls -lh /

$ lxc exec &lt;container&gt; --env mykey=myvalue


```

11. Files
  


```bash
$ lxc file pull &lt;container&gt;/&lt;path&gt; &lt;dest&gt;

$ lxc file pull &lt;container&gt;/&lt;path&gt; - //read file to standard output

$ lxc file push &lt;source&gt; &lt;container&gt;/&lt;path&gt;

$ lxc file edit &lt;container&gt;/&lt;path&gt;


```

11. Snapshot
  


```bash
$ lxc snapshot &lt;container&gt;

$ lxc snapshot &lt;container&gt; &lt;snapshot name&gt;

$ lxc info &lt;container&gt; //see snapshot

$ lxc restore &lt;container&gt; &lt;snapshot name&gt;

$ lxc move &lt;container&gt;/&lt;snapshot name&gt; &lt;container&gt;/&lt;new snapshot name&gt;

$ lxc delete &lt;container&gt;/&lt;snapshot name&gt;


```

12. Cloning/renaming/delting
  


```bash
$ lxc copy &lt;source container&gt; &lt;destination container&gt; 

$ lxc move &lt;old name&gt; &lt;new name&gt;  

$ lxc delete &lt;container&gt;


```

13. CPU limit

```bash
$ lxc config set my-container limits.cpu 2  //any 2 cpus



$ lxc config set my-container limits.cpu 1,3 // cpu #2 #4



$ lxc config set my-container limits.cpu 0-3,7-11



$ lxc config set my-container limits.cpu.allowance 10% // limit time 10% of total



$ lxc config set my-container limits.cpu.priority 0
```

14. Memory limit

```bash
$ lxc config set my-container limits.memory 256MB
```

15. Disk limit (requires btrfs or ZFS)

```bash
$ lxc config device set my-container root size 20GB
```

16. IO reading/writing limits

```bash
$ lxc config device set my-container root limits.read 20Iops

$ lxc config device set my-container root limits.write 10Iops
```

17. Autostart container

```bash
$ lxc config set container_name boot.autostart 1
```

18. Mount host directory
  
<?prettify linenums=true?>

```bash
$ lxc config device add container_name device_name disk source=host_directory path=guest_directory
```