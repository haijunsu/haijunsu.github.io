---
title: Fix “Failed To Start Session” At Login In Ubuntu 16.04
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, desktop]
---

I run into this error and found the solution at <https://itsfoss.com/failed-to-start-session-ubuntu-14-04/>

I used `Ctrl+Alt+F1` and run the following command to get Ubuntu Gnome Desktop up. But I am using xfce desktop.

```
sudo apt-get install ubuntu-desktop
```

Actually, it fixed the Gnome desktop instead of xfce. So I reinstall xfce desktop.

```
sudo apt install xubuntu-desktop
```

I don't remember what I installed and caused the problem. The desktop layout still different with my original desktop. But it looks ok.

I don't have time to investigate it. Just copy some steps from internet in case.

* Force reinstall desktop

```
sudo apt-get install --reinstall ubuntu-desktop
```

* Redo package configuration

```
sudo dpkg-reconfigure -a
```

* Install Gnome shell and Gnome-desktop

```
sudo apt-get install gnome-shell ubuntu-gnome-desktop
```
