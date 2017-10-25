---
title: ZFS Dataset is Busy Solution
author: Haijun (Navy) Su
layout: post
tags: [zfs, ubuntu]
---
Solution on Ubuntu:
Using the following command and find with process is holding the dataset.
```bash
grep zroot/2013-10-15T065955229209 /proc/*/mounts
```
<i class="fa fa-info-circle" aria-hidden="true"></i> note: replace **zroot/2013-10-15T065955229209** as your mount point.
{: .note}

Then find the process name and stop or restart the service. For me, it was systemd-timesyncd and I restarted it.
```bash
$ ps -p 11438
  PID TTY          TIME CMD
11438 ?        00:00:00 systemd-timesyn

$ ps -ef |grep 11438
systemd+ 11438     1  0 09:11 ?        00:00:00 /lib/systemd/systemd-timesyncd

$ sudo systemctl restart systemd-timesyncd

```
