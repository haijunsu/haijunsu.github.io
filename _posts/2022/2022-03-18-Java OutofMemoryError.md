---
title: Java OutOfMemoryError
author: Haijun (Navy) Su
layout: post
tags: [java]
---

## Memory Leak Symptoms

* Performance: Usually associated with excessive object creation and deletion, long delays in garbage collection, excessive operating system page swapping, and more. Works find with small data sets.
* Resource constraints: occurs when there's either to little memory available or your memory is too fragmented to allocate a large object - this can be native or, more commonly, Java heap-related.
* Java heap leaks: the classic memory leak, in which Java objects are continuously created without being released. This is usually caused by latent object references.
* Native memory leaks:associated with any continuously growing memory utilization that is outside the Java heap, such as allocations made by JNI code, drivers, or even JVM allocations.
* Spontaneous crashes


**Not all OutOfMemoryError(OOM) imply memory leaks**: an OOM can occur due to the generation of a large number of local variables or other such events. On the other hand, **not all memeory leaks necessarily manifest themselves as OOMs**, especially in the case of desktop applications or client applications (which aren't run for very long without restarts) 

## OutOfMemoryError error messages

* java.lang.OutOfMemoryError: Java heap space
* java.lang.OutOfMemoryError: PermGen space
* java.lang.OutOfMemoryError: Requested array size exceeds VM limit
* java.lang.OutOfMemoryError: Request &lt;size&gt; bytes for reason &lt;reason&gt;. Out of swap space?
* java.lang.OutOfMemoryError: &lt;reason&gt; &lt;stack trace&gt; (Native method)

## Application Crash Without OOM

* Running native code that doesn't check for errors returned by memory allocation functions
* Fatal error log or crash dump
	* The system might be configured with insufficient swap space
	* A process might be consuming all available memory resources (My issue)
	
## Common Memory Leaks

* File/Text buffers not closed
* Hash maps keeping references alive (static variables)
* Hashmap Key `equals()` and `hashcode()` are not implemented (Keep growing even the object has same values because hashmap is using the reference of the object)
* Inner classes that reference outer classes can leak. (make them static to avoid)

## Diagnosing and fixing Leaks

* Identify symptoms
	* Check the system configuration. If it is gone after increasing memory, it maybe not a leak issue. Since it requests more memory than the runtime heap offers, it can be due to poor design. For instances, creating multiple copies of an object or loading a big dataset into an array.
	* If an application steadily increases its memory utilization while processing the same kind of data, it might have a memory leak.
* Enable Verbose Garbage Collection
	* The `-verbosegc` argument allows you to generates a trace each time the garbage collection (GC) process is begun. The summary reports are printed to standard error, giveing you a sense of how the memory is being managed.
* Enable Profiling (VirtualVM tool)
	- jstatd
	- JMX (Java Management Extensions)
	VisualVM will automatically detect and connect to JVM applications that are running on version 6 of the JDK or that that have been started with the correct system properties on Version 5.0.

```shell
# tools.policy
grant {
	permission java.security.AllPermission;
};

jstatd -p 1089 -J-Djava.security.policy=tools.policy
```


```shell
java -Dcom.sun.management.jmxremote
     -Dcom.sun.management.jmxremote.port=1089 \
     -Dcom.sun.management.jmxremote.ssl=false \
     -Dcom.sun.management.jmxremote.authenticate=false \
     YourJavaAppAndOtherParams
```


* Analyze the Trace


Reference:

<https://www.toptal.com/java/hunting-memory-leaks-in-java>

<https://developers.redhat.com/blog/2014/08/14/find-fix-memory-leaks-java-application>

