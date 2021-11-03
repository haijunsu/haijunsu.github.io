---
title: Timedatactl Command
author: Haijun (Navy) Su
layout: post
tags: [linux, time, date, timezone]
---
* Display the current time and date
```shell
timedatectl status
```

* View current timezone
```shell
timedatectl |grep Time
```

* View all available timezones
```shell
timedatectl list-timezones
```

* Set local timezone
```shell
timedatectl set-timezone "America/New_York"
```

* Set time
```shell
timedatectl set-time 15:59:03
```

* Set date
```shell
timedatectl set-time 20181008
```

* Set both date and time
```shell
timedatectl set-time '2018-10-09 09:10:30'
```

* Set hardware clock to coordinated universal time (UTC)
```shell
timedatectl set-local-rtc 0
```

* Set hardware clock to local timezone
```shell
timedatectl set-local-rtc 1
```

* Synchronization with remote NTP server
```shell
timedatectl set-ntp true
```

* Disable NTP time Synchronization
```shell
timedatectl set-ntp false
```
