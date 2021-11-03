---
title: NoSQL Databases
author: Haijun (Navy) Su
layout: post
tags: [NoSQL, MongoDB, Cassandra]
---
## Types of NoSQL Databases
* Document store types ( MongoDB and CouchDB)
* Key-Value store types ( Redis and Volgemort)
* Column store types ( Cassandra)
* Graph store types ( Neo4j and Giraph)

## What is Hadoop, HBase, Hive and Cassandra?
* Hadoop, HBase, Hive and Cassandra all are Apache products.
* Apache Hadoop supports file storage, grid compute processing via Map reduce. 
* Apache Hive is a SQL like interface on the top of Haddop. 
* Apache HBase follows column family storage built like Big Table.
* Apache Cassandra also follows column family storage built like Big Table with Dynamo topology and consistency.

## Understanding NoSQL database? 
NoSQL is not "NO SQL". It is "Not Only SQL".
At the present time, the internet is loaded with big data, big users, big complexity etc. and also becoming more complex day by day. NoSQL is answer of all these problems, It is not a traditional database management system, not even a relational database management system (RDBMS). NoSQL stands for "Not Only SQL". NoSQL is a type of database that can handle and sort all type of unstructured, messy and complicated data. It is just a new way to think about the database.

## The structure of ObjectID in MongoDB
ObjectID is a 12-byte BSON type. These are:
* 4 bytes value representing seconds
* 3 byte machine identifier
* 2 byte process id
* 3 byte counter
