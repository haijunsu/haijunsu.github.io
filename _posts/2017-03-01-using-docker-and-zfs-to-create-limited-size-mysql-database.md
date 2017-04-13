---
id: 399
title: Using docker and zfs to create limited size mysql database
date: 2017-03-01T09:50:03+00:00
author: Navy Su
layout: post
---
Idea: Docker is run mysql server. Mysql data is stored on zfs volume and set the quota by zfs utility. Assume zpool name is zpool-mysql and mount point is /mysqldata

  1. Create volume for mysql data (test_quota)
  
     
    
```bash
sudo zfs create -o quota=1.4gb -o mountpoint=/mysqldata/test_quota zpool-mysql/test_quota

```

  2. Create mysql instance. Port forwarding is from host 8306 to guest 3306. User can access database using host port 8306.
  
     
    
```bash
docker run --name test_quota-db -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=my_test_quota -e MYSQL_USER=dbusername -e MYSQL_PASSWORD=dbuserpassword -v /mysqldata/test_quota:/var/lib/mysql -d  -p 8306:3306 mysql:latest

```

  3. Create systemd service for the container (test_quota-db.service)
  
     
    
```bash
[Unit]

Description=Mysql with quota setting

After=docker.service

Requires=docker.service

[Service]

User=

Group=docker

Restart=always

ExecStart=/usr/bin/docker start -a test_quota-db

ExecStop=/usr/bin/docker stop -t 2 test_quota-db

[Install]

WantedBy=multi-user.target

Alias=test_quota-db.service

```
    
    
```bash
sudo systemctl enable test_quota-db.service

```

  4. Using phpMyAdmin to manage database
  
     
    
```bash
docker run --name test_quota-phpmyadmin --link test_quota-db:db -e MYSQL_ROOT_PASSWORD=rootpassword -d -p 8080:80 phpmyadmin/phpmyadmin:latest

```
    
    
```bash
[Unit]

Description=phpMyAdmin for test_quota-db service

After=test_quota-db.service

Requires=test_quota-db.service

[Service]

User=dockeradm

Group=docker

Restart=always

ExecStart=/usr/bin/docker start -a test_quota-phpmyadmin

ExecStop=/usr/bin/docker stop -t 2 test_quota-phpmyadmin

[Install]

WantedBy=multi-user.target

Alias=test_quota-phpmyadmin.service

```
    
    
```bash
sudo systemctl enable test_quota-phpmyadmin.service

```