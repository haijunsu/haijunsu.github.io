---
id: 388
title: Mysql quota for database using zfs on CentOS 7
date: 2017-02-21T13:27:47+00:00
author: Navy Su
layout: post
---
Assume we have done <a href="http://navysu.x10host.com/2016/11/05/move-mysql-data-folder-to-zfs/" target="_blank">Move mysql data folder to ZFS on CentOS 7</a>.
  
Follow steps to create mysql database (run as root). (database files locate at /mysqldata)
  


```bash
// add fcontext for database storage folder. Only needs running once

semanage fcontext -a -t mysqld_db_t "/mysqldata(/.*)?"



// create folder for database

zfs create -o mountpoint=/mysqldata/test_quota -o quota=1gb mysqldata/test_quota

chown -R mysql:mysql /mysqldata/test_quota

chmod -R 700 /mysqldata/test_quota



cd /var/lib/mysql

mysql -e "create database test_quota;"

mv test_quota/db.opt /mysqldata/test_quota

mv test_quota /tmp

rm -rf /tmp/test_quota

ln -s /mysqldata/test_quota /var/lib/mysql

restorecon -R -v /mysqldata


```

Now the database space is only 1GB.
  
To delete mysql database
  


```bash
cd /var/lib/mysql

TABLES=$(mysql test_quota -e 'show tables' | awk '{ print $1}' | grep -v '^Tables' )



for t in $TABLES

do

	msg "Deleting $t table from ${dbname} database..."

	mysql ${dbname} -e "drop table $t"

done

echo "All tables have been dropped."

rm test_quota

mkdir test_quota

chown mysql:mysql test_quota

mysql -e "drop database test_quota"

zfs destroy mysqldata/test_quota

rm -rf /mysqldata/test_quota
```