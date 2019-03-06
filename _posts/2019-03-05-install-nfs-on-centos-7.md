---
title: Install NFS on CentOS 7
author: Haijun (Navy) Su
layout: post
tags: [centos, nfs]
---

* Install NFS Server. Server and client install same pacakge `nfs-utils`.
```bash
sudo yum install nfs-utils
```

* Create shared folder
```
mkdir /var/nfsshare
mod -R 755 /var/nfsshare
chown nfsnobody:nfsnobody /var/nfsshare
```

* Add share folder in /etc/exports
```
/var/nfsshare    192.168.0.101(rw,sync,no_root_squash,no_all_squash)
```

* Enable and start NFS server
```
sudo systemctl enable rpcbind
sudo systemctl enable nfs-server
sudo systemctl enable nfs-lock
sudo systemctl enable nfs-idmap
sudo systemctl start rpcbind
sudo systemctl start nfs-server
sudo systemctl start nfs-lock
sudo systemctl start nfs-idmap
```

* Setup firewall if it is enabled
```
sudo firewall-cmd --permanent --zone=public --add-service=nfs
sudo firewall-cmd --permanent --zone=public --add-service=mountd
sudo firewall-cmd --permanent --zone=public --add-service=rpc-bind
sudo firewall-cmd --reload
```

* Mount nfs folder on Client
```
mkdir -p /mnt/nfs/var/nfsshare
sudo mount -t nfs 192.168.0.100:/var/nfsshare /mnt/nfs/var/nfsshare/
```

* Permanent NFS mounting by editing `/etc/fstab`.
```
192.168.0.100:/var/nfsshare    /mnt/nfs/var/nfsshare   nfs defaults 0 0
```

Source: <https://www.howtoforge.com/nfs-server-and-client-on-centos-7>
