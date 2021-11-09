---
title: Set Java Application Timezone
author: Haijun (Navy) Su
layout: post
tags: [java, time, timeone, date]
---

#### Setting an Environment Variable

```
export TZ="America/New_York"
```

#### Setting a JVM Argument

```
java -Duser.timezone='America/New_York"
```

#### Setting the Timezone From the Application

```
System.setProperty("user.timezone", "America/New_York");
```

Another way

```
TimeZone.setDefault(TimeZone.getTimeZone("America/New_York"));
```

Reference:
<https://www.baeldung.com/java-jvm-time-zone>

