---
title: Using SpringBoot and Zookeeper to elect leader and workers
author: Haijun (Navy) Su
layout: post
tags: [spring, springboot, zookeeper, java]
---

## Setup up a Springboot application

`pom.xml`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
    <version>2.2.9.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.6.2</version>
</dependency>
```

## Configure Zookeeper properties

In `applications.properties` file, configure Zookeeper connection properties.

```properties
spring.cloud.zookeeper.connect-string=localhost:2181
```

## Create Zookeeper Leader Election Service

This service uses Zookeeper to elect a leader among the instances:

```java
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.recipes.leader.LeaderLatch;
import org.apache.curator.framework.recipes.leader.LeaderLatchListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.Closeable;
import java.io.IOException;

@Service
public class LeaderElectionService implements Closeable {

    private LeaderLatch leaderLatch;

    @Autowired
    private CuratorFramework client;

    @PostConstruct
    public void start() throws Exception {
        String latchPath = "/leader-latch";
        leaderLatch = new LeaderLatch(client, latchPath);
        leaderLatch.addListener(new LeaderLatchListener() {
            @Override
            public void isLeader() {
                System.out.println("I am the leader!");
                // Perform leader tasks here
            }

            @Override
            public void notLeader() {
                System.out.println("I am not the leader.");
            }
        });
        leaderLatch.start();
    }

    @Override
    public void close() throws IOException {
        leaderLatch.close();
    }
}
```

## Configure Curator Framework

Create a configuration class to initialize the Curator Framework client:

```java
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ZookeeperConfig {

    @Bean
    public CuratorFramework curatorFramework() {
        CuratorFramework client = CuratorFrameworkFactory.newClient(
            "localhost:2181", new ExponentialBackoffRetry(1000, 3));
        client.start();
        return client;
    }
}
```

## Create Worker Tasks

Create a service to represent worker tasks:

```java
import org.springframework.stereotype.Service;

@Service
public class WorkerService {

    public void performTask() {
        System.out.println("Performing worker task...");
        // Implement worker tasks here
        // This worker is for the leader to perform leader tasks.
    }
}
```

## Integrate Worker and Leader Roles

Integrate the worker tasks within the leader election logic:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private LeaderElectionService leaderElectionService;

    @Autowired
    private WorkerService workerService;

    @Scheduled(fixedRate = 5000)
    public void executeTasks() {
        if (leaderElectionService.isLeader()) {
            workerService.performTask();
        }
    }
}
```

Make sure the SpringBoot application is properly set up with `@EnableScheduling` to run the scheduled tasks.

## Run the Springboot application

Start the application and observe the leader election process and worker task execution.
