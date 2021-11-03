---
title: Volatile Variable in Java
author: Haijun (Navy) Su
layout: post
tags: [java, thread, multi-thread, volatile]
---
### What is volatitle variable?
**volatile** variable in Java is a special variable which is used to signal threads, a compiler that this particular variables value are going to updated by multiple threads.
1. Variable's value is always read from **main memory** instead of cached value.
2. Volatile variable guarantees "happens-before" relationship, which means not only another thread has visibility of latest value of volatile variable but also all the variable is seen by the thread which has updated value of volatile variable before these thread sees it.

### Important point related to volatile keyword in Java
1. The volatile keyword can only be applied to variable, it can not be applied to class or method. Using volatile keyword along with class and method is a compiler error.
2. A volatile is also referred as modifier in Java.

### When to use Volatile variable in Java
1. Any variable which is shared between multiple threads should be made variable, in order to ensure that all threads must see the latest value of the volatile variable.
2. A signal to compiler and JIT to ensure that compiler does not change ordering or volatile variable and moves them out of synchronized context.
3. You want to save the cost of synchronization as volatile variables are less expensive than synchronization.

Source: <http://www.java67.com/2012/08/what-is-volatile-variable-in-java-when.html>

