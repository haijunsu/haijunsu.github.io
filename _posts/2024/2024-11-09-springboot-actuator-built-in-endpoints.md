---
title: Springboot Actuator built-in endpoints
author: Haijun (Navy) Su
layout: post
tags: [java, spring, springboot, actuator]
---

Here are some of the most commonly used ones:

* `/actuator/health`: Shows the application health information.
* `/actuator/info`: Displays arbitrary application info.
* `/actuator/beans`: Shows all the Spring Beans in the application.
* `/actuator/metrics`: Provides metrics information.
* `/actuator/env`: Displays properties from the application's environment.
* `/actuator/loggers`: Exposes the configurations of the loggers in the application.
* `/actuator/threaddump`: Shows the current thread dump.
* `/actuator/heapdump`: Returns a heap dump file.
* `/actuator/scheduledtasks`: Shows the scheduled tasks in the application.
* `/actuator/httptrace`: Displays HTTP trace information (last 100 HTTP request-response exchanges).
