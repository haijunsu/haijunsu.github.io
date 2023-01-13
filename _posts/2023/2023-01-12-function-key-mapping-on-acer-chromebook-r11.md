---
title: Function key mapping on Acer Chromebook R11
author: Haijun (Navy) Su
layout: post
tags: [chromebook, linux, mint]
---

Installed Manjaro Mint Desktop on Acer Chromebook R11. All function keys became F1, F2 ... F10.

Mint desktop has pre-set volume shortcuts and change very easy from Keyboard shortcuts.

![volume shortcuts](/images/2023/volume_shortcuts.png)


It is difficult to set brightness key mapping. The following changes worked.

* Install `xorg-xbacklight`

```shell

sudo pamac install xorg-xbacklight
```

* Edit `/etc/default/grub`

```ini

GRUB_CMDLINE_LINUX_DEFAULT="quiet apparmor=1 security=apparmor udev.log_priority=3 acpi_backlight=vendor acpi_osi=linux "
```

* Apply grub changes

```shell

sudo update-grub
```


* Edit `/etc/X11/xorg.conf.d/00-keyboard.conf` and add the following content

```

Section "Device"
    Identifier  "Intel Graphics" 
    Driver      "intel"
    Option      "Backlight"  "intel_backlight"
EndSection
```

* Reboot

* Test brightness command

```shell

   xbacklight -5
   xbacklight +5

```

Final brightness settings

![brightness shortcuts](/images/2023/brightness_shortcuts.png)
