---
title: Why String is immutable in Java
author: Haijun (Navy) Su
layout: post
tags: [Java, String, immutable]
---
1. String values are stored in String constant pool. It can be accessed by multiple client.
2. It is used by the class loading mechanism. For security reason, it should not be changed to other value.
3. Immutable string allow to cache its hashcode. It makes hashmap/hashtable very fast since they don't calculate hashcode everytime.
4. String instance is thread-safe in Java.

Reference:
<http://javarevisited.blogspot.sg/2010/10/why-string-is-immutable-or-final-in-java.html>
