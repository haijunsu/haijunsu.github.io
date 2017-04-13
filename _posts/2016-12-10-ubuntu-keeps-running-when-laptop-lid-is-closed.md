---
id: 318
title: Ubuntu keeps running when laptop lid is closed
date: 2016-12-10T00:42:50+00:00
author: Navy Su
layout: post
---
Keep running after closed lid

```bash
$ sudo vi /etc/systemd/logind.conf

...

HandleLidSwitch=ignore

...



$ sudo service systemd-logind restart
```

The values of HandleLidSwitch are ignore, suspend, hibernate, and poweroff.

Keep console screen always on:

```bash
$ sudo vi /etc/default/grub

...

GRUB_CMDLINE_LINUX_DEFAULT="quiet splash consoleblank=0"

...



$ sudo update-grub

$ sudo shutdown -r now


```

Turn off console screen after 1 minute:

```bash
$ sudo vi /etc/default/grub

...

GRUB_CMDLINE_LINUX_DEFAULT="quiet splash consoleblank=60"

...



$ sudo update-grub

$ sudo shutdown -r now


```