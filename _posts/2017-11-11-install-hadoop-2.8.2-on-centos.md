---
title: Install Hadoop 2.8.2 on Centos
author: Haijun (Navy) Su
layout: post
tags: [Hadoop, Centos]
---
Assume all servers have been installed Centos 7 and all DNS records have been created on DNS Server.

Hosts
```shell
hdp-master
hdp-node01
hdp-node02
hdp-node03
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

## Download Hadoop from Apache website on one server
<http://hadoop.apache.org/releases.html>

## Unpack Hadoop file and rename folder to hadoop
```shell
tar -xzf hadoop-2.8.2.tar.gz
mv hadoop-2.8.2 hadoop
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
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib"
```

Edit .bashrc add the following line
```shell
. env.sh
```

Source env.sh
```shell
. env.sh
```

## Modify Hodoop configuration files
Hadoop has two types of configuration files
* Read-only default configuration
    * [core-default.xml](http://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/core-default.xml)
    * [hdfs-default.xml](http://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/hdfs-default.xml)
    * [yarn-default.xml](http://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-common/yarn-default.xml)
    * [mapred-default.xml](http://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/mapred-default.xml)
* Site-specific configuration
    * etc/hadoop/core-site.xml
    * etc/hadoop/hdfs-site.xml
    * etc/hadoop/yarn-site.xml
    * etc/hadoop/mapred-site.xml

To control Hadoop scripts, we need to modify `etc/hadoop/hadoop-env.sh` and `etc/hadoop/yarn-env.sh`.

Hadoop daemons:
* NameNode
* SecondaryNameNode
* DataNode

YARN daemons:
* ResourceManager
* NodeManager
* WebAppProxy

MapReduce:
* MapReduce Job History Server

Daemon |	Environment Variable
---|---
NameNode|	HADOOP_NAMENODE_OPTS
DataNode|	HADOOP_DATANODE_OPTS
Secondary NameNode	|HADOOP_SECONDARYNAMENODE_OPTS
ResourceManager|	YARN_RESOURCEMANAGER_OPTS
NodeManager|	YARN_NODEMANAGER_OPTS
WebAppProxy|	YARN_PROXYSERVER_OPTS
Map Reduce Job History Server|	HADOOP_JOB_HISTORYSERVER_OPTS

### Configure etc/hadoop/core-site.xml
```xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hdp-master:9000</value>
    </property>
    <property>
        <name>io.file.buffer.size</name>
        <value>131072</value>
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
        <value>/home/hadoop/data/dfs/name</value>
    </property>
    <property>
        <name>dfs.data.dir</name>
        <value>/home/hadoop/data/dfs/data</value>
    </property>
    <property>
        <name>dfs.permissions</name>
        <value>false</value>
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
        <value>hdp-master:10020</value>
    </property>
    <property>
        <name>mapreduce.obhistory.webapp.address</name>
        <value>hdp-master:19888</value>
    </property>
</configuration>
```

### Configure etc/hadoop/yarn-site.xml
```xml
<configuration>
    <property>
        <name>yarn.resourcemanager.scheduler.address</name>
        <value>hdp-master:8030</value>
    </property>
    <property>
        <name>yarn.resourcemanager.resource-tracker.address</name>
        <value>hdp-master:8031</value>
    </property>
    <property>
        <name>yarn.resourcemanager.address</name>
        <value>hdp-master:8032</value>
    </property>
    <property>
        <name>yarn.resourcemanager.admin.address</name>
        <value>hdp-master:8033</value>
    </property>
    <property>
        <name>yarn.resourcemanager.webapp.address</name>
        <value>hdp-master:8088</value>
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

### Create DFS folder
```shell
mkdir -p /home/hodoop/data/dfs
```

## Run Hadoop
### Copy Hadoop folder to other machines
```shell
scp -r ~/ hdp-node01:~/
scp -r ~/ hdp-node02:~/
scp -r ~/ hdp-node02:~/
```

### Hadoop default ports. Make sure those ports are not blocked by firewall.

Filename | Configure Parameter | Default Value | Description
--- | --- | --- | ---
core-site.xml | fs.defaultFS|	file:/// <br/> hdfs://hdp-master:9000|The name of the default file system. A URI whose scheme and authority determine the FileSystem implementation. The uri's scheme determines the config property (fs.SCHEME.impl) naming the FileSystem implementation class. The uri's authority is used to determine the host, port, etc. for a filesystem.
hdfs-site.xml | dfs.namenode.secondary.http-address|	0.0.0.0:50090|	The secondary namenode http server address and port.
hdfs-site.xml | dfs.namenode.secondary.https-address|	0.0.0.0:50091|	The secondary namenode HTTPS server address and port.
hdfs-site.xml | dfs.datanode.address | 	0.0.0.0:50010 | The datanode server address and port for data transfer.
hdfs-site.xml | dfs.datanode.http.address | 	0.0.0.0:50075|	The datanode http server address and port.
hdfs-site.xml | dfs.datanode.ipc.address | 	0.0.0.0:50020|	The datanode ipc server address and port.
hdfs-site.xml | dfs.namenode.http-address | 	0.0.0.0:50070|	The address and the base port where the dfs namenode web ui will listen on.
hdfs-site.xml | dfs.datanode.https.address|	0.0.0.0:50475|	The datanode secure http server address and port.
hdfs-site.xml | dfs.namenode.https-address|	0.0.0.0:50470|	The namenode secure http server address and port.
hdfs-site.xml | dfs.namenode.backup.address|	0.0.0.0:50100|	The backup node server address and port. If the port is 0 then the server will start on a free port.
hdfs-site.xml | dfs.namenode.backup.http-address|	0.0.0.0:50105|	The backup node http server address and port. If the port is 0 then the server will start on a free port.
hdfs-site.xml | dfs.journalnode.rpc-address|	0.0.0.0:8485|	The JournalNode RPC server address and port.
hdfs-site.xml | dfs.journalnode.http-address|	0.0.0.0:8480|	The address and port the JournalNode HTTP server listens on. If the port is 0 then the server will start on a free port.
hdfs-site.xml | dfs.journalnode.https-address|	0.0.0.0:8481|	The address and port the JournalNode HTTPS server listens on. If the port is 0 then the server will start on a free port.
mapred-site.xml | mpreduce.jobhistory.address|	0.0.0.0:10020|	MapReduce JobHistory Server IPC host:port
mapred-site.xml | mapreduce.jobhistory.webapp.address|	0.0.0.0:19888|	MapReduce JobHistory Server Web UI host:port
mapred-site.xml | mapreduce.jobhistory.webapp.https.address|	0.0.0.0:19890|	The https address the MapReduce JobHistory Server WebApp is on.
mapred-site.xml | mapreduce.jobtracker.address|	local|	The host and port that the MapReduce job tracker runs at. If "local", then jobs are run in-process as a single map and reduce task.
mapred-site.xml | yarn.app.mapreduce.am.job.client.port-range|	|	Range of ports that the MapReduce AM can use when binding. Leave blank if you want all possible ports. For example 50000-50050,50100-50200
mapred-site.xml | mapreduce.tasktracker.http.address?<br />mapred.task.tracker.http.address? |0 0.0.0.0:50060 | Tasktrackers? I cannot find it in example file.
mapred-site.xml | mapreduce.jobtracker.http.address?<br />mapred.job.tracker.http.address? | 0.0.0.0:50030 | Jobtracker? I cannot find it in example file
yarn-site.xml | yarn.resourcemanager.address|	${yarn.resourcemanager.hostname}:8032|	The address of the applications manager interface in the RM.
yarn-site.xml | yarn.resourcemanager.scheduler.address|	${yarn.resourcemanager.hostname}:8030|	The address of the scheduler interface.
yarn-site.xml | yarn.resourcemanager.webapp.address|	${yarn.resourcemanager.hostname}:8088|	The http address of the RM web application. If only a host is provided as the value, the webapp will be served on a random port.
yarn-site.xml | yarn.resourcemanager.webapp.https.address|	${yarn.resourcemanager.hostname}:8090|	The https address of the RM web application. If only a host is provided as the value, the webapp will be served on a random port.
yarn-site.xml | yarn.resourcemanager.resource-tracker.address|	${yarn.resourcemanager.hostname}:8031| |
yarn-site.xml | yarn.resourcemanager.admin.address|	${yarn.resourcemanager.hostname}:8033|	The address of the RM admin interface.
yarn-site.xml | yarn.nodemanager.webapp.address|	${yarn.nodemanager.hostname}:8042|	NM Webapp address.
yarn-site.xml | yarn.nodemanager.webapp.https.address|	0.0.0.0:8044|	The https adddress of the NM web application.
yarn-site.xml | yarn.timeline-service.address|	${yarn.timeline-service.hostname}:10200|	This is default address for the timeline server to start the RPC server.
yarn-site.xml | yarn.timeline-service.webapp.address|	${yarn.timeline-service.hostname}:8188|	The http address of the timeline service web application.
yarn-site.xml | yarn.timeline-service.webapp.https.address|	${yarn.timeline-service.hostname}:8190|	The https address of the timeline service web application.
yarn-site.xml | yarn.nodemanager.amrmproxy.address|	0.0.0.0:8048|	The address of the AMRMProxyService listener.
yarn-site.xml | yarn.sharedcache.client-server.address|	0.0.0.0:8045|	The address of the client interface in the SCM (shared cache manager)
yarn-site.xml | yarn.sharedcache.uploader.server.address|	0.0.0.0:8046|	The address of the node manager interface in the SCM (shared cache manager)
yarn-site.xml | yarn.sharedcache.admin.address|	0.0.0.0:8047|	The address of the admin interface in the SCM (shared cache manager)
yarn-site.xml | yarn.sharedcache.webapp.address|	0.0.0.0:8788|	The address of the web application in the SCM (shared cache manager)

### Format file system
```shell
bin/hdfs namenode -format
```
### Start Hodoop
```shell
sbin/start-all.sh
```
### Check services
* On master namenode
```shell
$ jps
12512 NameNode
12804 SecondaryNameNode
13098 ResourceManager
14858 Jps
```
* On datanodes
```shell
$ jps
14663 NodeManager
15511 Jps
14505 DataNode
```
* Check YARN resource manager web GUI http://hdp-master:8088
* Check DataNode information: http://hdp-master:50070

