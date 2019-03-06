---
title: Mysql Slave Node Last-IO-Error Got fatal error 1236
author: Haijun (Navy) Su
layout: post
tags: [mysql]
---


#### Problem 1
* Error Message
```
Last_IO_Error: Got fatal error 1236 from master when reading data from binary log: ‘log event entry exceeded max_allowed_packet; Increase max_allowed_packet on master; the first event ‘binlog.000201’ at 5480571
```

* Root Cause
This error usually occurs when you have a different size of max_allowed_packet on the master and slave (i.e. master max_allowed_packet size is greater then slave server). When the MySQL master server tries to send a bigger packet than defined on the slave server,  the slave server then fails to accept it and hence the error. I

This error usually occurs when updating a huge number of rows on the master and it doesn’t fit into the value of slave max_allowed_packet size because slave max_allowed_packet size is lower then the master. This usually happens with queries “LOAD DATA INFILE” or “INSERT .. SELECT” queries. As per my experience, this can also be caused by application logic that can generate a huge INSERT with junk data.

* Solution
Make sure to have the same value for max_allowed_packet on both slave and master.



#### Problem 2
* Error Message
```
Got fatal error 1236 from master when reading data from binary log: ‘Could not find first log file name in binary log index file’
```

* Root Cause
This error occurs when the slave server required binary log for replication no longer exists on the master database server. In one of the scenarios for this, your slave server is stopped for some reason for a few hours/days and when you resume replication on the slave it fails with above error.

* Solution
Re-create the slave server from a master server backup or from other slave in replication topology.

#### Problem 3
* Error Message
```
— Got fatal error 1236 from master when reading data from binary log: ‘binlog truncated in the middle of event; consider out of disk space on master; the first event ‘mysql-bin.000525’ at 175770780, the last event read from ‘/data/mysql/repl/mysql-bin.000525’ at 175770780, the last byte read from ‘/data/mysql/repl/mysql-bin.000525′ at 175771648.’
```

* Root Cause
Usually, this caused by sync_binlog <>1 on the master server which means binary log events may not be synchronized on the disk. There might be a committed SQL statement or row change (depending on your replication format) on the master that did not make it to the slave because the event is truncated.

* Solution
Move the slave thread to the next available binary log and initialize slave thread with the first available position on binary log as below:
```
mysql> CHANGE MASTE R TO MASTER_LOG_FILE='mysql-bin.000526', MASTER_LOG_POS=4;
```



Form more information, please visit: <https://www.percona.com/blog/2014/10/08/mysql-replication-got-fatal-error-1236-causes-and-cures/>



