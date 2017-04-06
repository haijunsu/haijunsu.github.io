---
id: 95
title: Move mysql data folder to ZFS on CentOS 7
date: 2016-11-05T02:31:29+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=95
permalink: /2016/11/05/move-mysql-data-folder-to-zfs/
categories:
  - CentOS
  - database
  - MySql
tags:
  - centos
  - data
  - folder
  - mariadb
  - mysql
  - zfs
---
1. change origin data folder as mount point
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo systemctl stop mariadb.service
cd /var/lib
sudo mv mysql mysql.bak
sudo mkdir mysql
sudo chown mysql:mysql mysql
</pre>

2. create zfs file system
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo zfs create -o mountpoint=/var/lib/mysql mysqldata/mysql
</pre>

3. mount zfs file system
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo zfs mount -a
</pre>

4. change mount point owner as mysql and cp all data file to /var/lib/mysql
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo chown mysql:mysql mysql
cd mysql.bak
sudo cp -p -r * ../mysql
cd ..
</pre>

5. install package _policycoreutils-python_
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo yum install policycoreutils-python
</pre>

6. run semanage fcontext and restorecon
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo semanage fcontext -a -t mysqld_db_t "/mysql(/.*)?"
sudo grep -i mysql /etc/selinux/targeted/contexts/files/file_contexts.local
sudo restorecon -R -v /var/lib/mysql
</pre>

7. start mysql
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo systemctl start mariadb.service
</pre>

Reference: <a href="https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/SELinux_Users_and_Administrators_Guide/sect-Managing_Confined_Services-MariaDB-Configuration_Examples.html" target="_blank">MariaDB Changing Database Location</a>