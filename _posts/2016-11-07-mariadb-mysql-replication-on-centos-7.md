---
id: 102
title: MariaDB (Mysql) replication on CentOS 7
date: 2016-11-07T12:34:07+00:00
author: Navy Su
layout: post
---
Master node: db01
  
Slave node: db02
  
1. On master node:

```bash
sudo vi /etc/my.cnf.d/server.cnf
```

`<em><br />
[server]<br />
# add follows in [server] section : get binary logs<br />
log-bin=mysql-bin<br />
# define uniq server ID<br />
server-id=101<br />
</em><br />
` 
  

```bash
sudo systemctl restart mariadb
```

2. create user on master node:

```bash
$&gt; mysql -u root -p 

Enter password:

Welcome to the MariaDB monitor.  Commands end with ; or \g.

Your MariaDB connection id is 4

Server version: 10.1.14-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# create user (set any password for 'password' section)

MariaDB [(none)]&gt; grant replication slave on *.* to replica@'%' identified by 'password'; 

Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]&gt; flush privileges; 

Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]&gt; exit

Bye
```

3. Change setting on slave node:

```bash
sudo  vi /etc/my.cnf.d/server.cnf
```

`<em><br />
[server]<br />
# add follows in [server] section : get binary logs<br />
log-bin=mysql-bin<br />
# define server ID (different one from Master Host)<br />
server-id=102<br />
# read only<br />
read_only=1<br />
# define own hostname<br />
report-host=db02<br />
</em>`

```bash
sudo systemctl restart mariadb
```

4. Dump databases on master node:

```bash
$&gt; mysql -u root -p 

Enter password:

Welcome to the MariaDB monitor.  Commands end with ; or \g.

Your MariaDB connection id is 4

Server version: 10.1.14-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# lock all tables

MariaDB [(none)]&gt; flush tables with read lock; 

Query OK, 0 rows affected (0.00 sec)

# show status (remember File, Position value)

MariaDB [(none)]&gt; show master status; 

+------------------+----------+--------------+------------------+

| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |

+------------------+----------+--------------+------------------+

| mysql-bin.000002 |      327 |              |                  |

+------------------+----------+--------------+------------------+

1 row in set (0.00 sec)

# remain the window above and open the another window and execute dump

[root@www ~]# mysqldump -u root -p --all-databases --lock-all-tables --events &gt; mysql_dump.sql 

Enter password:

# back to the remained window and unlock

MariaDB [(none)]&gt; unlock tables; 

Query OK, 0 rows affected (0.00 sec)

MariaDB [(none)]&gt; exit

Bye

# transfer the dump to Slave Host

$&gt; scp mysql_dump.sql node01.srv.world:/tmp/ 

```

5. Restore database on salve node
  

```bash
mysql -u root -p &lt; /tmp/mysql_dump.sql
```

6. Configure replica information on slave node:
  

```bash
mysql -u root -p 

Enter password:

Welcome to the MariaDB monitor.  Commands end with ; or \g.

Your MariaDB connection id is 5

Server version: 10.0.19-MariaDB-log MariaDB Server

Copyright (c) 2000, 2015, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]&gt; change master to 

    -&gt; master_host='10.0.0.31',     # Master Hosts's IP

    -&gt; master_user='replica',     # replication ID

    -&gt; master_password='password',     # replication ID's password

    -&gt; master_log_file='mysql-bin.000002',     # File value confirmed on Master

    -&gt; master_log_pos=327;     # Position value confirmed on Master

Query OK, 0 rows affected (0.24 sec)

# start replication

MariaDB [(none)]&gt; start slave;

Query OK, 0 rows affected (0.00 sec)

# show status

MariaDB [(none)]&gt; show slave status\G

*************************** 1. row ***************************

               Slave_IO_State: Waiting for master to send event

                  Master_Host: 10.0.0.31

                  Master_User: replica

                  Master_Port: 3306

                Connect_Retry: 60

              Master_Log_File: mysql-bin.000002

          Read_Master_Log_Pos: 545

               Relay_Log_File: mariadb-relay-bin.000002

                Relay_Log_Pos: 755

        Relay_Master_Log_File: mysql-bin.000002

             Slave_IO_Running: Yes

            Slave_SQL_Running: Yes

              Replicate_Do_DB:

          Replicate_Ignore_DB:

           Replicate_Do_Table:

       Replicate_Ignore_Table:

      Replicate_Wild_Do_Table:

  Replicate_Wild_Ignore_Table:

                   Last_Errno: 0

                   Last_Error:

                 Skip_Counter: 0

          Exec_Master_Log_Pos: 545

              Relay_Log_Space: 1055

              Until_Condition: None

               Until_Log_File:

                Until_Log_Pos: 0

           Master_SSL_Allowed: No

           Master_SSL_CA_File:

           Master_SSL_CA_Path:

              Master_SSL_Cert:

            Master_SSL_Cipher:

               Master_SSL_Key:

        Seconds_Behind_Master: 0

Master_SSL_Verify_Server_Cert: No

                Last_IO_Errno: 0

                Last_IO_Error:

               Last_SQL_Errno: 0

               Last_SQL_Error:

  Replicate_Ignore_Server_Ids:

             Master_Server_Id: 101

               Master_SSL_Crl:

           Master_SSL_Crlpath:

                   Using_Gtid: No

                  Gtid_IO_Pos:

      Replicate_Do_Domain_Ids:

  Replicate_Ignore_Domain_Ids:

                Parallel_Mode: conservative

1 row in set (0.00 sec)
```

7. Test your result on master node

```bash
$&gt; mysql -u root -p

Welcome to the MariaDB monitor.  Commands end with ; or \g.

Your MariaDB connection id is 402

Server version: 10.1.18-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]&gt; create database testreplica;

Query OK, 1 row affected (0.01 sec)

MariaDB [(none)]&gt; use testreplica;

Database changed

MariaDB [testreplica]&gt; create table test_table( id int, name varchar(30) );

Query OK, 0 rows affected (0.02 sec)

MariaDB [testreplica]&gt; insert into test_table values (1, 'test name');

Query OK, 1 row affected (0.00 sec)

MariaDB [testreplica]&gt; select * from test_table;

+------+-----------+

| id   | name      |

+------+-----------+

| 1    | test name |

+------+-----------+

1 row in set (0.00 sec)
```

8. Test on salve node

```bash
$&gt; mysql

Welcome to the MariaDB monitor.  Commands end with ; or \g.

Your MariaDB connection id is 6

Server version: 10.1.18-MariaDB MariaDB Server

Copyright (c) 2000, 2016, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]&gt; use testreplica;

Reading table information for completion of table and column names

You can turn off this feature to get a quicker startup with -A

Database changed

MariaDB [testreplica]&gt; select * from test_table;

+------+-----------+

| id   | name      |

+------+-----------+

|    1 | test name |

+------+-----------+

1 row in set (0.00 sec)
```

Reference: <https://www.server-world.info/en/note?os=CentOS_7&p=mariadb101&f=3>