---
title: Create a MongoDB Replica Set
author: Haijun (Navy) Su
layout: post
tags: [mongodb, cluster, replication, centos, ubuntu]
---

### Create 3 mongodb servers. Make sure update hosts files on all nodes or on DNS server
```ini
192.168.1.10 mongodb01
192.168.1.11 mongodb02
192.168.1.12 mongodb03
```

### Generate a key file on mongodb01
```shell
openssl rand -base64 741 > keyfile
scp keyfile mongodb02:~/
scp keyfile mongodb03:~/
```
Do following commands on all servers
```shell
sudo mkdir /opt/mongodb
sudo mv ~/keyfile /opt/mongodb
sudo chmod 400 /opt/mongodb/keyfile
```
Update ownership on Ubuntu/Debian:
```shell
sudo chown mongodb:mongodb /opt/mongodb/keyfile
```
Update ownership on CentOS
```shell
sudo chown mongod:mongod /opt/mongodb/keyfile
sudo chcon system_u:object_r:mongod_var_lib_t:s0 /opt/mongodb/keyfile
```

### Create an Administrator User (only on primary node: mongodb01)
```shell
mongo
use admin
db.createUser({user: "mongo-admin", pwd: "password", roles:[{role: "root", db: "admin"}]})
```

### Configure MongoDB
Edit `/etc/mongod.conf` on all nodes. You can edit on one node and copy it to other nodes
```conf
net:
  port: 27017
#  bindIp: 127.0.0.1  # Listen to local interface only, comment to listen on all interfaces.

security:
  authorization: enabled
  keyFile: /opt/mongo/mongo-keyfile

replication:
  replSetName: rs0
```

### Restart mongodb on all nodes
```shell
sudo systemctl restart mongod
```

### Initiate replication and add members on primary node mongodb01
```shell
mongo -u mongo-admin -p --authenticationDatabase admin
rs.initiate()
rs.add("mongodb02")
rs.add("mongodb03")
```
If primary node already has data, using following command to prevent secondary node vode. You can change the priority and votes values after database synced.
```shell
rs.add( { host: "mongodb02:27017", priority: 0, votes: 0 } )
rs.add( { host: "mongodb03:27017", priority: 0, votes: 0 } )
```

Check configuration and status
```shell
rs.conf()
rs.status()
```

### Troubleshooting
If all slave nodes stuck at STARTUP status, check the host value of primary. You can update as below:
```shell
r0:PRIMARY> var cfg = rs.conf()
rs0:PRIMARY> cfg.members[0].host="mongodb01"
rs0:PRIMARY> rs.reconfig(cfg)
```

Source:

<https://docs.mongodb.com/manual/core/replica-set-members/>

<https://docs.mongodb.com/manual/tutorial/deploy-replica-set/>

<https://linode.com/docs/databases/mongodb/create-a-mongodb-replica-set/>

<https://serverfault.com/questions/693282/mongo-secondaries-stuck-at-startup-state>
