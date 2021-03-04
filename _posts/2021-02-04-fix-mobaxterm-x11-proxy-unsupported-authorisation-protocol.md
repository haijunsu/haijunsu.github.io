---
title: Fix MobaXterm X11 proxy Unsupported authorisation protocol
author: Haijun (Navy) Su
layout: post
tags: [x11, kvm]
---

The error happened when I use `sudo virt-manager`.

### Solution
1. Add user to groups `kvm` and `libvirt` to avoid `sudo`
2. Copy `~/.Xauthority` to `/root/`


Reference:
<https://superuser.com/questions/1563911/why-do-only-some-applications-generate-mobaxterm-x11-proxy-unsupported-authori>
