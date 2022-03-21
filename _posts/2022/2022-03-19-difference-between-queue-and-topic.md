---
title: Difference between queue and topic
author: Haijun (Navy) Su
layout: post
tags: [java, topic, kafka, queue]
---

| Queue | Topic |
| --- | --- |
| The point-to-point or queue model works by the sender to receiver setup | Publish/subscriber or topic model works by bulletin setup |
| Acknowledgement of the identity of the receiver and oftentimes the sender | Anonymity in the identities of both the subscriber and publisher |
| Only allowed one recipient | Multiple recipients |
| The sender and receiver do not have to be both active at the same time | Timing is very vital |
| The sender will receive a notification when the message gets to the receiver | Not notify you with such, and there is even a risk that you will have no subscribers |


Reference: <http://www.differencebetween.net/technology/internet/difference-between-queue-and-topic/>