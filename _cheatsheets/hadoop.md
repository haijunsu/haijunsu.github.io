---
title: Hadoop
author: Haijun (Navy) Su
layout: page
tags: [Hadoop, cloud, HDFS]
---

### How is Hadoop different from other parallel computing systems?
Hadoop is a distributed file system, which lets you store and handle massive amount of data on a cloud of machines, handling data redundancy.
The primary benefit is that since data is stored in several nodes, it is better to process it in distributed manner. Each node can process the data stored on it instead of spending time in moving it over the network.
On the contrary, in Relational database computing system, you can query data in real-time, but it is not efficient to store data in tables, records and columns when the data is huge.
Hadoop also provides a scheme to build a Column Database with Hadoop HBase, for runtime queries on rows.

### What all modes Hadoop can be run in?
Hadoop can run in three modes:
* Standlon Mode
Default mode of Hadoop, it uses local file system for input and output operations. This mode is mainly used for debugging purpose, and it does not support the use of HDFS. Further, in this mode, there is no custom configuration required for mapred-site.xml, core-site.xml, hdfs-site.xml files. Much faster when compared to other modes.
* Psedo-Distributed Mode (Single Node Cluster)
In thiscase, you need configuration for all the three files mentioned above. In this case, all daemons are rnning on one node and thus, both Master and Slave node are the same.
* Fully Distributed Mode (Multiple Cluster Node)
This is the production phase of Hadoop (whatHadoop is known for) where data is used and distributed across several nodes on a Hadoop cluster. Separate nodes are allotted as Master and Slave.

### Explain the major difference between HDFS block and InputSplit.
In simple terms, block is the physical representation of data while split is the logical representation of data present in the block. Split acts as an intermediary between block and mapper.
If the 'split size' property is set to false, whole file will form one inputsplit and is processed by single map, consuming more time when the file is bigger.

### What is distributed cache and what are its benefits?
Distribute Cache, in Hadoop, is a service by MpaReduce framework to cache files when needed. Once a file is cached for a specific job, hadoop will make it available on each data node both in system and in memory, where map and reduce tasks are executing. Later, you can easily access and read the cache file and populate any collection (like array, hashmap) in you code.
**Benefits of using distributed cache are:**
* It distributes simple, read only text/data files and/or complex types like jars, archives and others. These archives are then un-archived at the slave node.
* Distributed cache tracks the modification timestamps of cache files, which notifies that the files should not be modified until a job is executing currently.

### Explain the difference between NameNode, Checkpoint NameNode and BackupNode.
* **NameNode** is the core of HDFS that manages the metadata - the information of what file maps to what block locations and what blocks are stored on what datanode. In simple terms, it's the data about the data being stored. NameNode supports a directory tree-like structure consisting of all the files present in HDFS on a Hadoop cluster. It uses following files for namespace:
    * fsimage file - it keeps track of the latest checkpoint of the namespace.
    * edits file - it is a log of changes that have been made to namespace since checkpoint.
* **Checkpoint NameNode** has the same directory structure as NameNode, and creates checkpoints for namespace at regular intervals by downloading the fsimage and edits file and margining them within the local directory. The new image after merging is then uploaded to NameNode.
There is a similar node like Checkpoint, commonly known as Secondary Node, but it does not support eh 'upload to NameNode' functionality.
* **Backup Node** provides similar functionality as Checkpoint, enforcing synchronization with NameNode. It maintains an up-to-date in memory copy of file system namespace and doesn't require getting hold of changes after regular intervals. The backup node needs to save the current state in-memory to an image file to create a new checkpoint.

### What are the most common Input Formats in Hadoop?
* **Text Input Format**: Default input format in Hadoop
* **Key Value Input Format**: used for plain text files where the files are broken into lines
* **Sequence File Input Format**: used for reading files in sequence

### Define DataNode and how does NameNode tackle DataNode failures?
DataNode stores data in HDFS; it is a node where actual data resides in the file system. Each datanode sends a hearbeat message to notify that it is alive. If the namenode does not receive a message from datanode for 10 minutes, it considers it to be dead or out of place and start replication of blocks that were hosted on that data node such that they are hosted on some other data node. A BlockReport contains list of all blocks on a DataNodee. Now, the system starts to replicate what were stored in dead DataNode.
The NameNode manages the replication of data blocksfrom one DataNode to other. In this process, the replication data transfers directly between DataNode such that the data never passes the NameNode.

10. What are the core methods of a Reducer?
* **setup()**: this method is used for configuring various parameters like input data size, distributed cache.
```java
    public void setup(context)
```
* **reduce()**: heart of the reducer always called once per key with the associated reduced task.
```java
    public void recude(Key, Value, context)
```
* **cleanup**: this method is called to clean temporary files, only once at the end of the task.
```java
    public void cleanuup(context)
```

### What is SequenceFile in Hadoop?
Extensively used in MapReduce I/O formats, SequenceFile is a flat file containing binary key/value pairs. The map outputs are stored as SequenceFile internally. It provides Reader, Writer, and Sorter classes. The three SequenceFile formats are
1. Uncompressed key/value records
2. Record compressed key/value records - only 'values' are compressed here.
3. Block compressed key/value records - both keys and values are collected in 'blocks' separately and compressed. The size of the 'block' is configurable.

### What is Job Tracker role in Hadoop?
Job Tracker's primary functions is *resource management* (managing the task trackers), *tracking resource availability* and *task life cycle management* (tracking the tasks progress and fault tolerance).
* It is a process that runs on a separate node, not on a DataNode ofter.
* Job Tracker communicates with the NameNode to identify data location.
* Finds the best Task Tracker Nodes to execute tasks on given nodes.
* Monitors individual Task Trackers and submits the overall job back to the client.
* It tracks the execution of MapReduce workloads local to the slave node.

### What is the use of RecordReader in Hadoop?
Since Hadoop splits data into various blocks, RecordReader is used to read the slit data into single record. For instance, if our input data is split like:
```
Row1: Welcome to
Row2: Intellipaat
```
It will read as "Welcome to Intellipaat" using RecordReader.

### What is Speculative Execution in Hadoop?
One limitation of Hadoop is that by distributing the tasks on several nodes, there are chances that few slow nodes limit the rest of the program. There are various reasons for the tasks to be slow, which are sometimes not easy to detect. Instead of identifying and fixing the slow-running tasks, Hadoop tries to detect the task runs slower than expected and then launches other equivalent task as backup. This backup mechanism in Hadoo is Speculative Execution.
It creates a duplicate task on another disk. The same input can be processed multiple times in parallel. When most tasks in a job comes to completion, the speculative execution mechanism schedules duplicate copies of remaining tasks ( which are slower) across the nodes that are free currently. When these tasks finish, it is intimated to the JobTracker. If other copies are executing speculatively, Hadoop notifies the TaskTrackers to quit those tasks and reject their output.
Speculative execution is by default true in Hadoop. To disable, set *mapred.map.tasks.speculative.execution* and mapred.reduce.tasks.speculative.execution* JobConf options to false.

### What happens if you try to run a Hadoop job with an output directory that is already present?
It will throw an exception saying that the output file directory already exists.
**To run** the MapReduce job, you need to ensure that the output directory does not exist before the HDFS.
**To delete**the directory before running the job, you can use shell: *Hadoop fs -rmr /path/to/your/output/* or via the Java API: *FileSystem.getlocal(conf).delete(outputDir, true)*

### How can you debug Hadoop code?
First, check the list of MapReduce jobs currently running. Next, we need to see that there are no orphened jobs running; if yes, you need to determine the location of RM logs.
1. Run: *ps -ef \| grep -l ResourceManager* and look for log directory in the displayed result. (Mine is standard input). Find out the job-id from the displayed list and check if there is any error message associated with that job.
2. On the basis of RM logs, identify the worker node that was involved in execution of the task.
3. Now, login to that node and run - *ps -ef \| grep iNodeManager*
4. Examine the Node Manager log. The majority of errors come from user level logs for each map-reduce job.

### How to configure Replication Factor in HDFS?
**hdfs-site.xml** is used to configure HDFS. Changeing the *dfs.replication* property in hdfs-site.xml will change the default replication for all files placed on HDFS.
You can also modify the replication factor on a per-file basis using the
```shell
$ hadoopfs -setrep -w 3 /my/fileConversely
```
You can also change the replication factor of all the files under a directory.
```shell
$ hadoopfs -setrep -w 3  -R /my/dir
```

### How to compress mapper output but not the reducer output?
To achieve this compression, you should set:
```
conf.set("mapreduce.map.output.compress", true)
conf.set("mapreduce.output.fileoutputformat.compress", false)
```

### What is the difference between Map Side join and Reduce Side join?
Map side join at map side is performed data reaches the map. You need a strict structure for defining map side join. On the other hand, Reduce side Join (Repartitioned Join) is simpler than map side join since the input datasets need not be structured. However, it is less efficient as it will have to go through sort and shuffle phases, coming with network overheads.

### How can you transfer data from Hive to HDFS?
By writing the query:
```shell
hive> insert overwrite directory '/' select * from emp;
```
You can write your query for the data you want to import from Hive to HDFS. The output you receive will be stored in part files in the specified HDFS path.





Source: <https://intellipaat.com/interview-question/big-data-hadoop-interview-questions/>
