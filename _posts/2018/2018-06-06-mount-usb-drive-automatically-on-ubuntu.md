---
title: Mount USB Drive Automatically on Ubuntu
author: Haijun (Navy) Su
layout: post
tags: [mount, ubuntu, usb]
---
* Find USB UUID
```shell
sudo blkid /dev/sdb2 | awk -F'"' '{print $2}'
```

* Edit `/etc/fstab` to mount USB drive at startup
```
UUID=<UUID> /media auto nosuid,nodev,nofail 0 0
```

Reference:
<https://askubuntu.com/questions/683034/how-to-automatically-mount-usb-flash-drive-at-startup>
<https://github.com/rbrito/usbmount>
