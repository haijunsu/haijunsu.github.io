---
title: Install Linux On A Chromebook
author: Haijun (Navy) Su
layout: post
tags: [chrome, chromebook]
---
## Create OS Recovery Media
1. Insert a USB stick 4GB or greater
2. Install *Chromebook Recovery Utility* extension for chrome browser
3. Launch *Chromebook Recovery Utility* and follow the guide to create OS Recovery Media

<i class="fa fa-info-circle" aria-hidden="true"></i> Note:
You can find the ID when you hold ESC+Refresh and power button to restart chromebook. It shows on the "OS verification is OFF" screen.
{: .note}

## Install Linux on Chromebook
1. Hold ESC+Refresh and power button
2. After reboot, there is error message screen. Then click "CTRL+D"
3. Confirm turn OS verification OFF
4. Reboot again and prepare system for developer mode.
5. Reboot again and logon with google account
6. Install *crouton integration extension* for chrome. It will provide download link for *crouton installer*.
7. Start chronos by click CTRL+ALT+T
```bash
crosh> shell

# List all recognized releases
$ sudo sh -e ~/Downloads/crouton -r list

# List available targes:
$ sudo sh -e ~/Downloads/crouton -t list

# Install ubuntu with xfce
$ sudo sh -e ~/Downloads/crouton -t xfce,xiwi,extension -r xenial
```
8. Create primary user
9. Start Linux
```bash
$ sudo startxfce4 -X xiwi
# or
$ sudo enter-chroot startxfce4 -X xiwi
```
