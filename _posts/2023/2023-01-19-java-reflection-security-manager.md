---
title: Java Reflection Security Manager
author: Haijun (Navy) Su
layout: post
tags: [java, security]
---

By default, the security manager is not loaded for an application. It allows to access all fields, methods, and constructors of a class after setting the accessible flag to true.

Using the following code to check whether the security manager has been loadded or not.

```java


SecurityManager smgr = System.getSecurityManager();
if (smgr == null) {
  System.out.println("Security manager is not loaded.");

}
```


By passing the `-Djava.security.manager` option and `-Djava.security.policy` option on the command line to load the Security Manager for an application.


```bash

java -Djava.security.manager
    -Djava.security.policy=conf/myapp.policy
    com.myapp.Application
```


Example of `conf/myapp.policy` 


```

grant {
  // Grant permission to all programs to access inaccessible members
  permission java.lang.reflect.ReflectPermission "SuppressAccessChecks";

}
```


Reference:

<https://www.demo2s.com/java/java-reflection-security-manager.html>

