---
title: Apache Kafka Best Practices
author: Haijun (Navy) Su
layout: post
tags: [Kafka message zookeeper mq]
---

## Managing Partition Counts

### Partition Sizing

* Fewer partitions per topic results in
  * Producer lag
  * Consumer lag
  * Starved or Overloaded broker & consumer
* More partitions per broker results in
  * More broker resources: file handles, memory, etc
  * Replication overhead

### Recommendations

* Plan partition counts before creating topics
* Partition count &gt;> Number of consumers in a group
* Use as many brokers as possible (including replicas)
* 1 Broker &lt: 1000 replicas
* Number of unique key values *gt; Number of partitions
* Load testing to measure right size partition based on
  * Overall peak load
  * Partitions Lag

## Managing Messages

* Keep message sizes small (No blog is included)
* Message formats
  * Choose binary standard formats like Avro
  * Use a schema repository to share message schema
  * Message Kesys
    * More unique values = better partitioning
    * Even distribution of values = better partitioning
    * Use keys only if message ordering is needed

## Managing Consumer Settings

* Choose Consumer Group size to match processing loads
* Choose batching parameters based on use case
  * Use batching to reduce network round trips
  * Use smaller batch sizes and polling intervals for low latency
  * Use manual commits to ensure processing reliability
  * Use non-blocking processing for higher throughput
  * Test failure conditions to verifiy desired results

## Managing Resiliency

* User replication to safeguard against broker failures
* Distribute brokers across different racks
* Use acknowledgements in producer for guaranteed delivery
* Use manual commits in consumers
* Configure multiple controllers (at least 3)
* Use mirroring if geo-redundancy is required
* Test resiliency use cases

## References

* Linkedin learning course "Apache Kafka Essential Training: Building Scalable Applications" by Kumaran Ponnambalam.
