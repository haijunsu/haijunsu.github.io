---
title: Install Hadoop 2.8.2 HA on Centos
author: Haijun (Navy) Su
layout: post
tags: [Centos, Hadoop, HA]
---

Assume all servers have been installed Centos 7 and all DNS records have been created on DNS Server.

Hosts
```shell
hdp-master1 - namenode zookeeper resourcemanager mapreduce.jobhistory
hdp-master2 - namenode zookeeper resourcemanager
hdp-node01 - datanode journalnode
hdp-node02 - datanode journalnode
hdp-node03 - datanode journalnode zookeeper
```

## Install java on all servers
```shell
sudo yum install java-1.8.0-openjdk-devel
```
JAVA_HOME is `/usr/lib/jvm/java`

* Create user *hadoop* on all servers
```shell
sudo useradd -s /bin/bash hadoop
sudo passwd hadoop
```

## Logon as hadoop

* Create ssh key on one server
```shell
ssh-keygen -t rsa
cd ~/.ssh
cat id_rsa.pub > authorized_keys
chmod 700 *
```

## Copy all key files to other servers
* Make sure folder `~/.ssh` exists on server and folder mode is 700.
* Use `scp` command to copy files between servers

```shell
scp ~/.ssh/* <target server ip>:~/.ssh/
```
## Download Hadoop and Zookeeper from Apache website on one server
<http://hadoop.apache.org/releases.html>
<http://zookeeper.apache.org/releases.html>

## Unpack Hadoop file and rename folder to hadoop
```shell
tar -xzf hadoop-2.8.2.tar.gz
mv hadoop-2.8.2 hadoop
tar -xzf zookeeper-3.4.11.tar.gz
mv zookeeper-3.4.11 zookeeper
```

## Configure Hodoop environment
Create env.sh with following contents

```shell
#!/bin/bash

# Set Java environment
export JAVA_HOME=/usr/lib/jvm/java
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH

# Set Hadoop environment
export HADOOP_HOME=/home/hadoop/hadoop
export HADOOP_PREFIX=$HADOOP_HOME
export CLASSPATH=.:$HADOOP_HOME/lib:$CLASSPATH
export PATH=$PATH:$HADOOP_HOME/bin
export PATH=$PATH:$HADOOP_HOME/sbin
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export YARN_HOME=$HADOOP_HOME
export HADOOP_ROOT_LOGGER=INFO,console
# Solve problem "WARN util.NativeCodeLoader: Unable to load native-hadoop library for your platform..."
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib:$HADOOP_COMMON_LIB_NATIVE_DIR"

# Zookeeper
export ZOOKEEPER_HOME=/home/hadoop/zookeeper
export PATH=$PATH:$ZOOKEEPER_HOME/bin
```

Edit .bashrc add the following line
```shell
. env.sh
```

Source env.sh
```shell
. env.sh
```

Using `scp` command copy `.bashrc` and `env.sh` to other machines
```shell
scp ~/.bashrc <server ip>:~/
scp ~/env.sh <server ip>:~/
```

## Create DFS and Zookeeper data folders
```shell
mkdir -p /home/hodoop/data/dfs
mkdir -p /home/hodoop/data/zookeeper
```

## Zookeeper configuration files
```shell
$ cd ~/zookeeper/conf
$ cp zoo_simple.cfg zoo.cfg
```
Edit `zoo.cfg` as below
```ini
# The number of milliseconds of each tick
tickTime=2000
# The number of ticks that the initial
# synchronization phase can take
initLimit=10
# The number of ticks that can pass between
# sending a request and getting an acknowledgement
syncLimit=5
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just
# example sakes.
dataDir=/home/hadoop/data/zookeeper
# the port at which the clients will connect
clientPort=2181
# the maximum number of client connections.
# increase this if you need to handle more clients
#maxClientCnxns=60
#
# Be sure to read the maintenance section of the
# administrator guide before turning on autopurge.
#
# http://zookeeper.apache.org/doc/current/zookeeperAdmin.html#sc_maintenance
#
# The number of snapshots to retain in dataDir
#autopurge.snapRetainCount=3
# Purge task interval in hours
# Set to "0" to disable auto purge feature
#autopurge.purgeInterval=1
server.1=hdp-master1:2888:3888
server.2=hdp-master2:2888:3888
server.3=hdp-node03:2888:3888
```

## Modify Hodoop configuration files
### Configure etc/hadoop/core-site.xml
```xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hdpcluster</value>
    </property>
    <property>
        <name>io.file.buffer.size</name>
        <value>131072</value>
    </property>
    <property>
        <name>ha.zookeeper.quorum</name>
        <value>hdp-master1:2181,hdp-master2:2181,hdp-node03:2181</value>
    </property>
</configuration>
```

### Configure etc/hadoop/hdfs-site.xml
```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>3</value>
    </property>
    <property>
        <name>dfs.name.dir</name>
        <value>file:///home/hadoop/data/dfs/name</value>
    </property>
    <property>
        <name>dfs.data.dir</name>
        <value>file:///home/hadoop/data/dfs/data</value>
    </property>
    <property>
        <name>dfs.permissions</name>
        <value>false</value>
    </property>
    <!-- QJM cluster - hdpcluster -->
    <property>
        <name>dfs.nameservices</name>
        <value>hdpcluster</value>
    </property>
    <property>
        <name>dfs.ha.namenodes.hdpcluster</name>
        <value>nn1,nn2</value>
    </property>
    <property>
        <name>dfs.namenode.rpc-address.hdpcluster.nn1</name>
        <value>hdp-master1:8020</value>
    </property>
    <property>
        <name>dfs.namenode.rpc-address.hdpcluster.nn2</name>
        <value>hdp-master2:8020</value>
    </property>
    <property>
        <name>dfs.namenode.http-address.hdpcluster.nn1</name>
        <value>hdp-master1:50070</value>
    </property>
    <property>
        <name>dfs.namenode.http-address.hdpcluster.nn2</name>
        <value>hdp-master2:50070</value>
    </property>
    <property>
        <name>dfs.namenode.shared.edits.dir</name>
        <value>qjournal://hdp-node01:8485;hdp-node02:8485;hdp-node03:8485/hdpcluster</value>
    </property>
    <property>
        <name>dfs.ha.automatic-failover.enabled</name>
        <value>true</value>
    </property>
    <property>
        <name>dfs.client.failover.proxy.provider.hdpcluster</name>
        <value>org.apache.hadoop.hdfs.server.namenode.ha.ConfiguredFailoverProxyProvider</value>
    </property>
    <property>
        <name>dfs.ha.fencing.methods</name>
        <value>shell(ssh -t $target_host '/home/hadoop/hadoop/sbin/hadoop-daemon.sh start namenode')
            shell(/bin/true)</value>
    </property>
    <property>
        <name>dfs.jouranlnode.edits.dir</name>
        <value>/home/hadoop/data/dfs/jouranls</value>
    </property>
</configuration>
```

### Configure etc/hadoop/mapred-site.xml
```xml
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
    <property>
        <name>mapreduce.jobhistory.address</name>
        <value>hdp-master1:10020</value>
    </property>
    <property>
        <name>mapreduce.obhistory.webapp.address</name>
        <value>hdp-master1:19888</value>
    </property>
</configuration>
```

### Configure etc/hadoop/yarn-site.xml
```xml
<configuration>
    <property>
        <description>Enable RM to recover state after starting. If true, then
        yarn.resourcemanager.store.class must be specified</description>
        <name>yarn.resourcemanager.recovery.enabled</name>
        <value>true</value>
    </property>
    <property>
        <description>The class to use as the persistent store.</description>
        <name>yarn.resourcemanager.store.class</name>
        <value>org.apache.hadoop.yarn.server.resourcemanager.recovery.ZKRMStateStore</value>
    </property>
    <property>
        <name>yarn.resourcemanager.ha.enabled</name>
        <value>true</value>
    </property>
    <property>
        <name>yarn.resourcemanager.cluster-id</name>
        <value>yarn-cluster</value>
    </property>
    <property>
        <name>yarn.resourcemanager.ha.rm-ids</name>
        <value>rm1,rm2</value>
    </property>
    <property>
        <name>yarn.resourcemanager.hostname.rm1</name>
        <value>hdp-master1</value>
    </property>
    <property>
        <name>yarn.resourcemanager.hostname.rm2</name>
        <value>hdp-master2</value>
    </property>
    <property>
        <name>yarn.resourcemanager.webapp.address.rm1</name>
        <value>hdp-master1:8088</value>
    </property>
    <property>
        <name>yarn.resourcemanager.webapp.address.rm2</name>
        <value>hdp-master2:8088</value>
    </property>
    <property>
        <name>yarn.resourcemanager.zk-address</name>
        <value>hdp-node01:2181,hdp-node02:2181,hdp-node03:2181</value>
    </property>
    <property>
        <name>yarn.resourcemanager.scheduler.address.rm1</name>
        <value>hdp-master1:8030</value>
    </property>
    <property>
        <name>yarn.resourcemanager.scheduler.address.rm2</name>
        <value>hdp-master2:8030</value>
    </property>
    <property>
        <name>yarn.resourcemanager.resource-tracker.address.rm1</name>
        <value>hdp-master1:8031</value>
    </property>
    <property>
        <name>yarn.resourcemanager.resource-tracker.address.rm2</name>
        <value>hdp-master2:8031</value>
    </property>
    <property>
        <name>yarn.resourcemanager.address.rm1</name>
        <value>hdp-master1:8032</value>
    </property>
    <property>
        <name>yarn.resourcemanager.address.rm2</name>
        <value>hdp-master2:8032</value>
    </property>
    <property>
        <name>yarn.resourcemanager.admin.address.rm1</name>
        <value>hdp-master1:8033</value>
    </property>
    <property>
        <name>yarn.resourcemanager.admin.address.rm2</name>
        <value>hdp-master2:8033</value>
    </property>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
        <value>org.apache.hadoop.mapred.ShuffleHandler</value>
    </property>
</configuration>
```

### Assign slaves
* etc/hadoop/slaves
```
hdp-node01
hdp-node02
hdp-node03
```

## Run Hadoop
### Copy Hadoop folder to other machines
```shell
scp -r ~/hadoop <server-ip>:~/
scp -r ~/zookeeper <server-ip>:~/
scp -r ~/data <server-ip>:~/
```
### Start journalnode on hdp-node01, hdp-node02, and hdp-node03.
```shell
$ hadoop-daemon.sh start journalnode
```
### Format file system
```shell
bin/hdfs namenode -format
```
### Start HDFS. It starts nodemanager on both hdp-master1 and hdp-master2.
```shell
sbin/start-dfs.sh
```
### Start Yarn on hdp-master1 and hdp-master2.
```shell
$ start-yarn.sh
```

<i class="fa fa-info-circle" aria-hidden="true"></i> This command only starts YARN on current machine. We need to run it on standby machine too. There is no fencing for them. If one failed, we need to restart it manually.
{: .note}
### Check services
* On master namenode
```shell
$ jps
55014 QuorumPeerMain
81693 ResourceManager
80748 DFSZKFailoverController
89391 Jps
80254 NameNode
```
* On datanodes
```shell
$ jps
2384 Jps
141939 DataNode
142628 NodeManager
142072 JournalNode
```

* Check YARN resource manager web GUI http://hdp-master1:8088
* Check DataNode information: http://hdp-master1:50070

To verify HA function, just kill the active namenode and resourcemanager and check standby namenode and resourcemanager. Those standby nodes becomes active nodes automatically.

