---
id: 51
title: Backup/Move LXC Container
date: 2016-11-02T23:24:14+00:00
author: Navy Su
layout: post
---
  1. Stop lxc container
    
```bash
$ sudo lxc-stop -n <container>
```

  2. Archive lxc container. DON&#8217;T forget the option **_&#8216;&#8211;numeric-owner&#8217;._** **The &#8216;&#8211;numeric-owner&#8217; flag is very important! Without it, the container may not boot because the uid/gids get mangled in the extracted filesystem**
  
     
    
```bash
$ sudo - su

$ cd /var/lib/lxc/<container>/

$ tar --numeric-owner -czvf container_fs.tar.gz ./*
```

  3. Copy the archive file to another server (ftp, sftp, or scp)
  4. Extract files on the new server
    
```bash
$ sudo su -

$ mkdir /var/lib/lxc/<container>/

$ cd /var/lib/lxc/<container>/

$ tar --numeric-owner -xzvf container_fs.tar.gz 
```
    
    reference:
    
    <http://stackoverflow.com/questions/23427129/how-do-i-backup-move-lxc-containers></li> </ol>