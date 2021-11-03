---
title: LVM Extend ROOT with EXT4 File System
author: Haijun (Navy) Su
layout: post
tags: [LVM Linux ext4]
---

**Problem:** root partition was full.
```shell
$ df -h
Filesystem                         Size  Used Avail Use% Mounted on
udev                               3.9G     0  3.9G   0% /dev
tmpfs                              799M   67M  732M   9% /run
/dev/mapper/silver--vg-root         37G   36G     0 100% /
...
```

**Solution:** Add a new disk and extend root partition
* Check physical volume
```shell
$ sudo pvdisplay
  --- Physical volume ---
  PV Name               /dev/vda5
  VG Name               silver-vg
  PV Size               39.52 GiB / not usable 2.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              10117
  Free PE               9
  Allocated PE          10108
  PV UUID               ijgLbE-gtL8-MMyO-KamM-565M-2H0G-kulLHK
```
* Check available disk (Because the machine is a VM, the disk device start with 'vd')
```shell
$ ls /dev/vd*
/dev/vda  /dev/vda1  /dev/vda2  /dev/vda5  /dev/vdb
```
* Add /dev/vdb to volume group
```shell
$ sudo vgextend silver-vg /dev/vdb
  Physical volume "/dev/vdb" successfully created
  Volume group "silver-vg" successfully extended
```
```shell
$ sudo pvdisplay
  --- Physical volume ---
  PV Name               /dev/vda5
  VG Name               silver-vg
  PV Size               39.52 GiB / not usable 2.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              10117
  Free PE               9
  Allocated PE          10108
  PV UUID               ijgLbE-gtL8-MMyO-KamM-565M-2H0G-kulLHK

  --- Physical volume ---
  PV Name               /dev/vdb
  VG Name               silver-vg
  PV Size               500.00 GiB / not usable 4.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              127999
  Free PE               127999
  Allocated PE          0
  PV UUID               2smifP-ZIqb-GbQI-EEmJ-LzaR-xvJs-kfV8AJ
```
```shell
$ sudo vgdisplay silver-vg
  --- Volume group ---
  VG Name               silver-vg
  System ID
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  4
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               539.52 GiB
  PE Size               4.00 MiB
  Total PE              138116
  Alloc PE / Size       10108 / 39.48 GiB
  Free  PE / Size       128008 / 500.03 GiB
  VG UUID               Z55Ym0-awj1-fkME-BK5O-k6Ab-xq4J-4RZ9yE
```
* Extend logical volume
```shell
$ sudo lvextend -L535G /dev/mapper/silver--vg-root
  Size of logical volume silver-vg/root changed from 530.00 GiB (135680 extents) to 535.00 GiB (136960 extents).
  Logical volume root successfully resized.
```
```shell
$ sudo vgdisplay
  --- Volume group ---
  VG Name               silver-vg
  System ID
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  9
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               539.52 GiB
  PE Size               4.00 MiB
  Total PE              138116
  Alloc PE / Size       137983 / 539.00 GiB
  Free  PE / Size       133 / 532.00 MiB
  VG UUID               Z55Ym0-awj1-fkME-BK5O-k6Ab-xq4J-4RZ9yE
```
* Resize file system
```shell
$ sudo resize2fs /dev/mapper/silver--vg-root
resize2fs 1.42.13 (17-May-2015)
Filesystem at /dev/mapper/silver--vg-root is mounted on /; on-line resizing required
old_desc_blocks = 26, new_desc_blocks = 34
The filesystem on /dev/mapper/silver--vg-root is now 140771328 (4k) blocks long.<Paste>
```
```shell
$ df -h
Filesystem                         Size  Used Avail Use% Mounted on
udev                               3.9G     0  3.9G   0% /dev
tmpfs                              799M   67M  732M   9% /run
/dev/mapper/silver--vg-root        529G   36G  472G   7% /
...
```

Other commands: [LVM common tasks](/lvm-common-tasks)
