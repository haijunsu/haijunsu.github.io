---
title: SSHFS on Centos
author: Haijun (Navy) Su
layout: post
tags: [sshfs, centos]
---

## Install on machine which needs mount other folders only.
```shell
sudo yum install epel-release
sudo yum install fuse
sudo yum install sshfs
sudo modprobe fuse
```

## Mount ssh folders (make sure the user is using key authentication)
```shell
mkdir /home/testuser/machine1
sshfs testuser@machine1:~/shared /home/testuser/machine1
```

## Unmount
```shell
fusermount -u /home/testuser/machine1
```

## Sync two folders
```shell
#!/bin/bash
USER="testuser"
mkdir /home/${USER}/syncFolder
nodes="machine1 machine2"
for node in $nodes
do
        echo "Syncing ${node} ..."
        sshfs ${USER}@${node}:/home/${USER}/projects /home/${USER}/syncFolder
        rsync -az --delete /home/${USER}/projects/ /home/${USER}/syncFolder
        fusermount -u /home/${USER}/syncFolder
done
rm -rf /home/${USER}/syncFolder
echo "Done"
```

