---
id: 318
title: Ubuntu keeps running when laptop lid is closed
date: 2016-12-10T00:42:50+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=318
permalink: /2016/12/10/ubuntu-keeps-running-when-laptop-lid-is-closed/
categories:
  - Linux
  - Ubuntu
tags:
  - lid
  - ubuntu
---
Keep running after closed lid

<pre class="prettyprint">$ sudo vi /etc/systemd/logind.conf
...
HandleLidSwitch=ignore
...

$ sudo service systemd-logind restart</pre>

The values of HandleLidSwitch are ignore, suspend, hibernate, and poweroff.

Keep console screen always on:<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo vi /etc/default/grub
...
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash consoleblank=0"
...

$ sudo update-grub
$ sudo shutdown -r now
</pre>

Turn off console screen after 1 minute:

<pre class="prettyprint">$ sudo vi /etc/default/grub
...
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash consoleblank=60"
...

$ sudo update-grub
$ sudo shutdown -r now
</pre>