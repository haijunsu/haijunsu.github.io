---
title: Force User Logout on Linux
author: Haijun (Navy) Su
layout: post
tags: [linux, logout]
---
There are two commands can be used: skill and pkill
* Halt/Stop a user
```shell
skill -STOP -u <username>
```
or
```shell
pkill -STOP -u <username>
```

* Resume Halted User
```shell
skill -CONT -u <username>
```
or
```shell
pkill -CONT -u <username>
```

* Kill and Logout a User
```shell
skill -KILL -u <username>
```
or
```shell
pkill -KILL -u <username>
```

* Kill and Logout All Users
```shell
skill -KILL -u /dev/pts/*
```

* Kill all php-cgi process owned by a user
```shell
pkill -KILL -u <username> php-cgi
```

Reference
<https://www.cyberciti.biz/tips/howto-linux-kill-and-logout-users.html>
