---
title: Curator Framework in Springboot
author: Haijun (Navy) Su
layout: post
tags: [curator, framework, spring, springboot, java]
---

Curator Framework is a high-level API provided by Apache Curator, designed to simplify interaction with Apache Zookeeper. When integrated with Springboot, it becomes even more powerful, allowing for more manageable and scalable distributed systems.

## Key features of Curator Framework

* **Simplified Connection Handling:** It manages connections to ZooKeeper and handles reconnection, session expiration, etc., which can be quite complex when done manually.
* **Recipes:** CUrator provides various high-level abstractions (recipes) such as Leader Election, Distributed Locks, and Barriers, making common distributed coordination tasks much easier.
* **Retry Mechanism:** Curator includes a robust retry mechanism to handle intermittent failures, which is essential in distributed system.

See: [Using SpringBoot and Zookeeper to elect leader and workers](/using-springboot-and-zookeeper-to-elect-leader-and-workers/)
