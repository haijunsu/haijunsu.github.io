---
title: Spring Boot Standalone Application
author: Haijun (Navy) Su
layout: post
tags: [java, spring]
---

### Disable WebContainer
Since Spring 2.0.0, Spring provides [WebApplicationType Enum](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/WebApplicationType.html) to give more controls of SpringApplication. Currently it supports the following types:
- **None**: The application should not run as a web application and should not start an embedded web servicer.
- **REACTIVE**: The application should run as a reactive web application and should start an embedded reactive web server.
- **SERVLET**: THe application should run as a servlet-based web application and should start an embedded servlet web server.


```ini
spring.main.web-application-type=none
```

### Implement the `CommandLineRunner` interface

Here an example. For detail to check on the [github](https://github.com/haijunsu/GroupStudy/tree/master/haijun/java/JavaBasic).

```java
package com.navysu.java.basic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JavaBasicApplication implements CommandLineRunner {
	
	@Autowired
	private MyBootStarter starter;

	public static void main(String[] args) {
		SpringApplication.run(JavaBasicApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		for (String arg: args) {
			System.out.println(arg);
		}
		starter.sayHello();

```