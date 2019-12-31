---
title: USB Mount on Ubuntu 18
author: Haijun (Navy) Su
layout: page
tags: [ubuntu, usb]
---

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
