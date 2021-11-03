---
title: Hadoop YARN
author: Haijun (Navy) Su
layout: post
tags: [Hadoop, Bigdata, Machine Learning, Yarn]
---
### What is YARN?
YARN stands for Yet Another Resource Negotiator. It is a generic resource platform for managing resources in a cluster. YARN was introduced with Hadoop 2.0, an open source distributed processing framework from Apache.
![YARN](/images/ml/Hadoop2.0.jpg)

### Why YARN?
The main challenges for Hadoop 1.x are Scalability, Resource Utilization and Lack of support for multiple programming models (Hadoop 1.x only supports MapReduce).

As the data Operating System for Hadoop 2.0, YARN allows multiple applications to co-exist in the same shared cluster. YARN also takes into consideration of Scalability, High utilization, support multiple programming models, flexible resource model, Security, Reliability, and compatibility.
![Hadoop 1 vs 2](/images/ml/YARN-Hadoop2.0.png)

### YARN Architecture
YARN separates the JobTracker (Hadoop 1.x) into a cluster level ResourceManager (RM) and application specific ApplicationMaster (AM). YARN architecture follows master-slave architectural model in which ResourceManager as a master and node specific slave NodeManager (NM). NodeManager replaces the TaskTracker in Hadoop 1.x.

![JobTrack, TaskTracker](/images/ml/Hadoop-1.x-Job-Tracker.png)
JobTracker/TaskTracker

![Resource Manager](/images/ml/ResourceManager.png)
ResourceManager/NodeManager

**ResourceManager (RM)**

ResourceManager acts as Global resource scheduler. It is responsible for resource management and scheduling per ApplicationMaster’s requests from resource requirements of the application(s). It is also responsible for management of hierarchical job queues.

**ApplicationMaster (AM)**

ApplicationMaster works at application level. It is responsible for application life-cycle management, negotiating appropriate resources from the Scheduler, tracking status and progress monitoring.

**NodeManager (NM)**

NodeManager acts as a machine agent and is responsible for management of life-cycle of the container and monitoring their resource usages.

I want to use an example here to explain the YARN architecture in detail. Please refer to the diagram below.

![YARN Architure](/images/ml/YARN-Architure.png)

A Client submits the application to the ResourceManager. In above diagram client 1 submit a MapReduce  Request and client 2 submit Shell Script Request.

* ResourceManager allocates a container to start up the ApplicationMaster for each application request submitted by client – one ApplicationMaster for Shell Script and one for MapReduce application.
* After starting a ApplicationMaster, it registers application with ResourceManager.
* After startup of ApplicationMaster, it negotiates with ResourceManager for appropriate resources as per the application requirement.
* After resource allocation from ResourceManager, ApplicationMaster requests NodeManager to launch the containers allocated by ResourceManager.
* On successful launching of containers, application code executes within the container. ApplicationManager reports back to ResourceManager with execution status of application.
* During execution of the application, client can request ApplicationMaster or directly with ResourceManager for application status, progress updates etc.
* On application execution process completion, ApplicationMaster request ResourceManager to unregister and shut down its own container process.

### YARN Scheduler Policies
**FIFO Scheduler (First in First out Scheduler)**

FIFO means First in First Out – the job submitted first will get the priority to execute, in other words job runs in order of submission. FIFO does not guarantee performance efficiency as one job might be using a whole cluster for execution so all the other jobs have to wait to finish its execution.

**Fair Scheduler**

Fair Scheduling make sure all applications can get equal share of cluster resources over a period of time. For example if a single job is running, it will get all the resources available in the cluster. As the job number increases, free resources will be given to the jobs so that each user will get a fair share of the cluster. In Fair Scheduling policy, all jobs are placed into a job pool, specific to users. Each user gets his own job pool. A user who submitted more jobs than the other users will not get more resources on average.

**Capacity Scheduler**

Capacity Scheduler is designed to allow applications to share cluster resources in a predictable and simple fashion, very commonly known as job queues. It provides capacity guarantees to support multiple queues. When job is submitted to the queue, the queue is allocated a capacity in the sense that a certain capacity of resources will be available. All the jobs submitted to the queue will access the resources allocated to the job queue. Admins can control over the capacity on each queue.

Source: <http://jennyxiaozhang.com/4-things-you-need-to-know-about-yarn/>
