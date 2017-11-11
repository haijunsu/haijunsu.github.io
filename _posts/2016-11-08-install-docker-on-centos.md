---
id: 112
title: Install Docker on CentOS
date: 2016-11-08T09:40:29+00:00
author: Navy Su
layout: post
---
1. Add docker yum repository
  

~~~shell
$ sudo yum update

$ sudo tee /etc/yum.repos.d/docker.repo <<-'EOF'

[dockerrepo]

name=Docker Repository

baseurl=https://yum.dockerproject.org/repo/main/centos/7/

enabled=1

gpgcheck=1

gpgkey=https://yum.dockerproject.org/gpg

EOF

~~~

2. Install docker package
  

~~~shell
$ sudo yum install docker-engine

~~~

3. Enable docker service
  

~~~shell
$ sudo systemctl enable docker.service

~~~

4. Start docker deamon
  

~~~shell
$ sudo systemctl start docker

~~~

5. Verify docker installation
  

~~~shell
$ sudo docker run --rm hello-world

 Unable to find image 'hello-world:latest' locally

 latest: Pulling from library/hello-world

 c04b14da8d14: Pull complete

 Digest: sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9

 Status: Downloaded newer image for hello-world:latest

 Hello from Docker!

 This message shows that your installation appears to be working correctly.

 To generate this message, Docker took the following steps:

  1. The Docker client contacted the Docker daemon.

  2. The Docker daemon pulled the "hello-world" image from the Docker Hub.

  3. The Docker daemon created a new container from that image which runs the

     executable that produces the output you are currently reading.

  4. The Docker daemon streamed that output to the Docker client, which sent it

     to your terminal.

 To try something more ambitious, you can run an Ubuntu container with:

  $ docker run -it ubuntu bash

 Share images, automate workflows, and more with a free Docker Hub account:

  https://hub.docker.com

 For more examples and ideas, visit:

  https://docs.docker.com/engine/userguide/

~~~

6. Try ubuntu bash
  

~~~shell
$ docker run -it ubuntu bash

root@118120c1d392:/# df -h

Filesystem                                                                            Size  Used Avail Use% Mounted on

zpool-docker/docker/2dd4a3f8615dbb9face911e7e824f76a40451d7eb533e1533efd52bd237f15bd  100G  126M  100G   1% /

tmpfs                                                                                 5.7G     0  5.7G   0% /dev

tmpfs                                                                                 5.7G     0  5.7G   0% /sys/fs/cgroup

zpool-docker/docker                                                                   100G  896K  100G   1% /etc/hosts

shm                                                                                    64M     0   64M   0% /dev/shm

root@118120c1d392:/# exit (exit ubuntu and stop the container, # Ctrl+p, Ctrl+q key to back to Host's console)

~~~

7. Add user to docker group
  

~~~shell
$ sudo usermod -aG docker `whoami`

~~~

8. logout and logon again. Now you can run docker without root privilege.
  
9. cleanup test code
  

~~~shell
$ docker ps -all

CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

118120c1d392        ubuntu              "bash"              20 minutes ago      Up 12 minutes                           stupefied_darwin

$ docker stop 118120c1d392

118120c1d392       

$ docker rm 118120c1d392        

118120c1d392        

$ docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE

ubuntu              latest              f753707788c5        3 weeks ago         127.1 MB

$ docker rmi ubuntu

Untagged: ubuntu:latest

Untagged: ubuntu@sha256:2d44ae143feeb36f4c898d32ed2ab2dffeb3a573d2d8928646dfc9cb7deb1315

Deleted: sha256:f753707788c5c100f194ce0a73058faae1a457774efcda6c1469544a114f8644

Deleted: sha256:3b25e17d01de5200842cadbdc53f4afa1a3ed17a7121e4036e744a83a2732f76

Deleted: sha256:cebd67936ff89b117f72c410b11cc835c96cc8eabd161564ca38bfff99d781f5

Deleted: sha256:5d232b0ea43a530cd4db4be2c175b9dd46f534fa9cc8dcbf1d413c851f74e817

Deleted: sha256:dafccc932aece6c4914ca049df6539b75145ee2cf51f76e8d129aade450c87c3

Deleted: sha256:c854e44a1a5a22c9344c90f68ef6e07fd479e8ce1030fe141e3236887f1a4920

~~~

10. Configure zfs for Docker
  

~~~shell
$ sudo zpool create -f zpool-docker /dev/xvdb

$ sudo zfs list

 NAME                 USED  AVAIL  REFER  MOUNTPOINT

 zpool-docker         93.5K  3.84G    19K  /zpool-docker

$ sudo mv /var/lib/docker /var/lib/docker.bak

$ sudo mdkir /var/lib/docker

$ sudo zfs create -o mountpoint=/var/lib/docker zpool-docker/docker

$ sudo zfs list -t -all

 NAME                 USED  AVAIL  REFER  MOUNTPOINT

 zpool-docker         93.5K  3.84G    19K  /zpool-docker

 zpool-docker/docker  19K    3.84G    19K  /var/lib/docker

~~~

11. Configure docker storage driver
  

~~~shell
sudo vi /etc/default/docker

~~~

`<em><br />
DOCKER_OPTS="-D --storage-driver=zfs"<br />
</em>`
  
12. Restart docker
  

~~~shell
$ sudo systemctl restart docker

~~~

13. Check docker info
  

~~~shell
$ docker info

Containers: 0

 Running: 0

 Paused: 0

 Stopped: 0

Images: 0

Server Version: 1.12.3

Storage Driver: zfs

 Zpool: zpool-docker

 Zpool Health: ONLINE

 Parent Dataset: zpool-docker/docker

 Space Used By Parent: 19456

 Space Available: 515932850688

 Parent Quota: no

 Compression: off

Logging Driver: json-file

Cgroup Driver: cgroupfs

Plugins:

 Volume: local

 Network: host bridge null overlay

Swarm: inactive

Runtimes: runc

Default Runtime: runc

Security Options: seccomp

Kernel Version: 3.10.0-327.36.3.el7.x86_64

Operating System: CentOS Linux 7 (Core)

OSType: linux

Architecture: x86_64

CPUs: 8

Total Memory: 11.34 GiB

Name: quic-docker01

ID: ILRK:H6AI:CRUL:QRKA:LXFS:5PBI:TJ3J:DE55:YSAP:T6G6:LWXI:L7IF

Docker Root Dir: /var/lib/docker

Debug Mode (client): false

Debug Mode (server): false

Registry: https://index.docker.io/v1/

WARNING: bridge-nf-call-iptables is disabled

WARNING: bridge-nf-call-ip6tables is disabled

Insecure Registries:

 127.0.0.0/8

~~~