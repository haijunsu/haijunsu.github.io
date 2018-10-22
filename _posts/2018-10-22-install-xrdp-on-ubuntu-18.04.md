---
title: Install xRDP on Ubuntu 18.04
author: Haijun (Navy) Su
layout: post
tags: [linux, ubuntu, rdp, xrdp, xfce]
---

* Install packages
```shell
sudo apt update
sudo apt install xrdp xfce4 xfce4-terminal tango-icon-theme
```

* Tell xRDP to use xfce4
```shell
sudo sed -i.bak '/fi/a #xrdp multiple users configuration \n xfce-session \n' /etc/xrdp/startwm.sh
```

* Open RDP port
```shell
sudo ufw allow 3389/tcp
```


Reference: <https://medium.com/@vivekteega/how-to-setup-an-xrdp-server-on-ubuntu-18-04-89f7e205bd4e>
