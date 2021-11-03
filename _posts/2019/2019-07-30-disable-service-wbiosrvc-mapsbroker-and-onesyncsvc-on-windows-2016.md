---
title: Disable Service WbioSrvc MapsBroker and OneSyncSvc on Windows 2016
author: Haijun (Navy) Su
layout: post
tags: [Windows]
---

By default, the Windows server 2016 enables MapsBroker, OneSyncSvc and WbioSrvc services. Those services may be stopped for some reason and they causes error messages on dashboard. It's kind of noisy. Use the following command to disable them in Command Prompt (Admin).

```shell
sc config "OneSyncSvc" start=disabled 
sc config "MapsBroker" start=disabled
sc config "WbioSrvc" start=disabled

sc stop "OneSyncSvc"
sc stop "MapsBroker"
sc stop "WbioSrvc"
```
