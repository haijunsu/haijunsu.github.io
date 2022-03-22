---
title: Set Java Application Timezone
author: Haijun (Navy) Su
layout: post
tags: [java, time, timeone, date]
---

#### Setting an Environment Variable

```shell
export TZ="America/New_York"
```

#### Setting a JVM Argument

```shell
java -Duser.timezone='America/New_York"
```

#### Setting the Timezone From the Application

```java
System.setProperty("user.timezone", "America/New_York");
```

Another way

```java
TimeZone.setDefault(TimeZone.getTimeZone("America/New_York"));
```

Reference:
<https://www.baeldung.com/java-jvm-time-zone>

