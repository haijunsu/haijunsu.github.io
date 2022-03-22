---
title: Kafka Commands
author: Haijun (Navy) Su
layout: post
tags: [kafka, java, python]
---


## Docker composefile for a single node

```yaml
version: '2'
services:

#Zookeeper Service.
  zookeeper:
    image: 'bitnami/zookeeper:latest'
    restart: "no"
    ports:
      - '2181:2181'
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
    container_name: zookeeper

#Kafka Service
  kafka:
    image: 'bitnami/kafka:latest'
    restart: "no"
    ports:
      - '9092:9092'
      - '29092:29092'
      
    environment:
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=INTERNAL://:29092,EXTERNAL://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=INTERNAL://kafka:29092,EXTERNAL://localhost:9092
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_INTER_BROKER_LISTENER_NAME=INTERNAL
      - ALLOW_PLAINTEXT_LISTENER=yes
      
    container_name: kafka-broker
    
    depends_on:
      - "zookeeper"
```

## Docker composefile for a cluster

```yaml
version: '2'
services:

#Zookeeper Service.
#Image Tag: bitnami/zookeeper:3.6.2

  zookeeper:
    image: 'bitnami/zookeeper:latest'
    restart: "no"
    ports:
      - '2181:2181'
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes
    container_name: zookeeper

#Kafka Service
#Image Tag: bitnami/kafka:2.7.0

  kafka1:
    image: 'bitnami/kafka:latest'
    restart: "no"
    ports:
      - '9092:9092'
      - '29092:29092'
      
    environment:
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=INTERNAL://:29092,EXTERNAL://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=INTERNAL://kafka1:29092,EXTERNAL://localhost:9092
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_INTER_BROKER_LISTENER_NAME=INTERNAL
      - ALLOW_PLAINTEXT_LISTENER=yes
      
    container_name: kafka-broker1
    
    depends_on:
      - "zookeeper"
      
  kafka2:
    image: 'bitnami/kafka:latest'
    restart: "no"
    ports:
      - '9093:9093'
      - '29093:29093'
      
    environment:
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=INTERNAL://:29093,EXTERNAL://:9093
      - KAFKA_CFG_ADVERTISED_LISTENERS=INTERNAL://kafka2:29093,EXTERNAL://localhost:9093
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_INTER_BROKER_LISTENER_NAME=INTERNAL
      - ALLOW_PLAINTEXT_LISTENER=yes
      
    container_name: kafka-broker2
    
    depends_on:
      - "zookeeper"
    
  kafka3:
    image: 'bitnami/kafka:latest'
    restart: "no"
    ports:
      - '9094:9094'
      - '29094:29094'
      
    environment:
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT
      - KAFKA_CFG_LISTENERS=INTERNAL://:29094,EXTERNAL://:9094
      - KAFKA_CFG_ADVERTISED_LISTENERS=INTERNAL://kafka3:29094,EXTERNAL://localhost:9094
      - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_INTER_BROKER_LISTENER_NAME=INTERNAL
      - ALLOW_PLAINTEXT_LISTENER=yes
      
    container_name: kafka-broker3
    
    depends_on:
      - "zookeeper"
      
#KafDrop UI for management
#Image Tag: obsidiandynamics/kafdrop:3.27.0

  kafdrop:
    image: 'obsidiandynamics/kafdrop:latest'
    restart: "no"
    ports:
      - 9000:9000
    
    environment:
      - KAFKA_BROKERCONNECT=kafka1:29092,kafka2:29093,kafka3:29094
      - JVM_OPTS=-Xms32M -Xmx64M
      - SERVER_SERVLET_CONTEXTPATH=/
    
    container_name: kafdrop
    depends_on:
      - "kafka1"
      - "kafka2"
      - "kafka3"
      
```

## Logging into the Kafka Container

```shell
docker exec -it kafka-broker /bin/bash
```

## Navigate to the Kafka Scripts directory

```shell
   cd /opt/bitnami/kafka/bin
```

## Creating new Topics

```shell
        ./kafka-topics.sh \
            --bootstrap-server localhost:29092 \
            --create \
            --topic kafka.learning.tweets \
            --partitions 1 \
            --replication-factor 1

        ./kafka-topics.sh \
            --bootstrap-server localhost:29092 \
            --create \
            --topic kafka.learning.alerts \
            --partitions 1 \
            --replication-factor 1
```

## Listing Topics

```shell
        ./kafka-topics.sh \
            --bootstrap-server localhost:29092 \
            --list
```

## Getting details about a Topic

```shell
        ./kafka-topics.sh \
            --bootstrap-server localhost:29092 \
            --describe
```

## Publishing Messages to Topics

```shell
        ./kafka-console-producer.sh \
            --bootstrap-server localhost:29092 \
            --topic kafka.learning.tweets
```

## Consuming Messages from Topics

```shell
        ./kafka-console-consumer.sh \
            --bootstrap-server localhost:29092 \
            --topic kafka.learning.tweets \
            --from-beginning
```

## Deleting Topics

```shell
        ./kafka-topics.sh \
            --bootstrap-server localhost:29092 \
            --delete \
            --topic kafka.learning.alerts
```
            
## Create a Topic with multiple partitions

```shell
        ./kafka-topics.sh \
            --bootstrap-server localhost:29092 \
            --create \
            --topic kafka.learning.orders \
            --partitions 3 \
            --replication-factor 1
```

## Check topic partitioning

```shell            
        ./kafka-topics.sh \
            --bootstrap-server localhost:29092 \
            --topic kafka.learning.orders \
            --describe
```

## Publishing Messages to Topics with keys

```shell
        ./kafka-console-producer.sh \
            --bootstrap-server localhost:29092 \
            --property "parse.key=true" \
            --property "key.separator=:" \
            --topic kafka.learning.orders
```

## Consume messages using a consumer group

```shell
        ./kafka-console-consumer.sh \
            --bootstrap-server localhost:29092 \
            --topic kafka.learning.orders \
            --group test-consumer-group \
            --property print.key=true \
            --property key.separator=" = " \
            --from-beginning
```

## Check current status of offsets

```shell
        ./kafka-consumer-groups.sh \
            --bootstrap-server localhost:29092 \
            --describe \
            --all-groups
```

Another resource: <https://developer.confluent.io/quickstart/kafka-docker/>