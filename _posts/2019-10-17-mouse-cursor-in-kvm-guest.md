---
title: Mouse cursor in KVM guest
author: Haijun (Navy) Su
layout: post
tags: [kvm, linux, vrish]
---

### Problem
On windows guest, the mouse movement is a bit jerky.

### Solution one
Add `-usb -usbdevice tablet` to qemu commandline. The host's mouse position will be used in the guest even without having to click inside the window to give it focus.

### Solution two
Using `virt-manager`, the equivalent for that is to open up the virtual machine details > Add Hardware > Input > EvTouch USB Graphics tablet.

Reference:
<https://www.linuxquestions.org/questions/slackware-14/mouse-cursor-in-kvm-guest-4175575243/>
