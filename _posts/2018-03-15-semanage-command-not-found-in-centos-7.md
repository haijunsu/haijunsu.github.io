---
title: semanage Command not Found in CentOS 7
author: Haijun (Navy) Su
layout: post
tags: [centos, trubleshooting, yum, selinux]
---

If you can't find a command in CentOS, try the following example (for command *semanage*):
```
sudo yum provides /usr/sbin/semanage
```
Then install the package which needs.

Source: <https://www.ostechnix.com/linux-troubleshooting-semanage-command-not-found-in-centos-7rhel-7/>
