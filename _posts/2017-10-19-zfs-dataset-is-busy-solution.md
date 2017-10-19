---
title: ZFS Dataset is Busy Solution
author: Haijun (Navy) Su
layout: post
tags: [zfs, ubuntu]
---
Solution on Ubuntu:
Using the following command and find with process is holding the dataset. Then kill the process and it will be ok.
```bash
grep zroot/2013-10-15T065955229209 /proc/*/mounts
```
<i class="fa fa-info-circle" aria-hidden="true"></i> note: replace **zroot/2013-10-15T065955229209** as your mount point.
