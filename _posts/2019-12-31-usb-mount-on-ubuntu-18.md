---
title: USB Mount on Ubuntu 18
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, usb]
---

**NOTE:** To mount usb drive in fstab is better. See [Mount USB Drive Automatically on Ubuntu](/mount-usb-drive-automatically-on-ubuntu/)

Install usbmount manually to support ubuntu 18.

```
git clone http://github.com/rbrito/usbmount.git
cd usbmount
sudo dpkg-buildpackage -us -uc -b
sudo dpkg -i usbmount_0.0.24_all.deb
^ Fails because of unmet dependencies use:
sudo apt --fix-broken install
```

Reference:
<https://askubuntu.com/questions/1074909/usbmount-fails-to-automount>
