---
id: 95
title: Move mysql data folder to ZFS on CentOS 7
date: 2016-11-05T02:31:29+00:00
author: Navy Su
layout: post
---
1. change origin data folder as mount point
  

~~~shell
sudo systemctl stop mariadb.service

cd /var/lib

sudo mv mysql mysql.bak

sudo mkdir mysql

sudo chown mysql:mysql mysql

~~~

2. create zfs file system
  

~~~shell
sudo zfs create -o mountpoint=/var/lib/mysql mysqldata/mysql

~~~

3. mount zfs file system
  

~~~shell
sudo zfs mount -a

~~~

4. change mount point owner as mysql and cp all data file to /var/lib/mysql
  

~~~shell
sudo chown mysql:mysql mysql

cd mysql.bak

sudo cp -p -r * ../mysql

cd ..

~~~

5. install package _policycoreutils-python_
  

~~~shell
sudo yum install policycoreutils-python

~~~

6. run semanage fcontext and restorecon
  

~~~shell
sudo semanage fcontext -a -t mysqld_db_t "/mysql(/.*)?"

sudo grep -i mysql /etc/selinux/targeted/contexts/files/file_contexts.local

sudo restorecon -R -v /var/lib/mysql

~~~

7. start mysql
  

~~~shell
sudo systemctl start mariadb.service

~~~

Reference: <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/SELinux_Users_and_Administrators_Guide/sect-Managing_Confined_Services-MariaDB-Configuration_Examples.html" target="_blank">MariaDB Changing Database Location</a>