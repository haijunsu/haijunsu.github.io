---
title: Install MongoDB on CentOS
author: Haijun (Navy) Su
layout: post
tags: [mongodb, centos]
---
MongoDB provides four packages

Package Name | Description
--- | ---
mongodb-org |	A metapackage that will automatically install the four component packages listed below.
mongodb-org-server |	Contains the mongod daemon and associated configuration and init scripts.
mongodb-org-mongos |	Contains the mongos daemon.
mongodb-org-shell  |	Contains the mongo shell.
mongodb-org-tools |	Contains the following MongoDB tools: mongoimport bsondump, mongodump, mongoexport, mongofiles, mongooplog, mongoperf, mongorestore, mongostat, and mongotop.

* Configure the package management system (yum)
Create a /etc/yum.repos.d/mongodb-org-3.4.repo file so that you can install MongoDB directly, using yum. Use the following repository file:
```ini
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
```

* Install the MongoDB packages and associated tools
```bash
sudo yum install -y mongodb-org
```

* Configure SELinux
Method 1.
```bash
sudo semanage port -a -t mongod_port_t -p tcp 27017
```
method 2. Disable SELinux by setting the *SELINUX* setting to *disabled* in **/etc/selinux/config**.
```ini
SELINUX=disabled
```
<i class="fa fa-info-circle" aria-hidden="true"></i> You must reboot the system for the changes to take effect.
method 3. Set SELinux to *permissive* mode in **/etc/selinux/config** by setting the *SELINUX* setting to *permissive*
```ini
SELINUX=permissive
```
<i class="fa fa-info-circle" aria-hidden="true"></i> You must reboot the system for the changes to take effect.

* Move data storage to ZFS
```bash
sudo zfs create -o mountpoint=/var/lib/mongo/ <zpool name>/mongo
sudo chown -R mongod:mongod /var/lib/mongo
```

* install package *policycoreutils-python*
```bash
sudo yum install policycoreutils-python
```

* run semange fcontext and restorecon
```bash
sudo semanage fcontext -a -t mongod_db_t "/mongo(/.*)?"
sudo semanage fcontext -a -t mongod_var_lib_t "/mongo(/.*)?"
sudo grep -i mongod /etc/selinux/targeted/contexts/files/file_contexts.local
```

* Start MongoDB
```bash
sudo systemctl start mongod
```
You can verify that the mongod process has started successfully by checking the contents of the log file at /var/log/mongodb/mongod.log for a line reading
```
[initandlisten] waiting for connections on port <port>
```

* Enable MongoDB start following a system reboot
```
sudo chkconfig mongod on
```

* Enable authorization and listen on all IPs
<i class="fa fa-info-circle" aria-hidden="true"></i> You need create user first before you enable authorization. see: [mongodb cheetsheet](/cheatsheets/mongodb/)
Update the /etc/mongod.conf

```ini
# network interfaces
net:
  port: 27017
#  bindIp: 127.0.0.1  # Listen to local interface only, comment to listen on all interfaces.


security:
  authorization: enabled
```

### Uninstall MongoDB
```
sudo systemctl stop mongod
sudo yum erase $(rpm -qa | grep mongodb-org)
sudo rm -r /var/log/mongodb /var/lib/mongo
```

