---
title: LVM Common Tasks
author: Haijun (Navy) Su
layout: post
tags: [Linux, LVM]
---

* Initializing disks or disk partitions
For entire disks:
```shell
$ pvcreate /dev/sda
```
For partitions:
```shell
$ pvcreate /dev/sda1
```

* Creating a volume group
```shell
$ vgcreate <groupname> /dev/hda1 /dev/dhb1
```

* Activating a volume group
```shell
$ vgchange -an
$ vgchange -a y <groupname>
```

* Removing a volume group
Deactivate the volume group:
```shell
$ vgchange -a n <groupname>
```
Remove the volume group
```shell
$ vgremove <groupname>
```

* Adding physical volumes to a volume group
```shell
$ vgextend <groupname> /dev/hdc1
                                ^^^^^^^^ new physical volume
```

* Removing physical volumes from a volume group
Make sure that the physical volume isn't used by any logical volumes

```shell
$ pvdisplay /dev/hda1

--- Physical volume ---
PV Name               /dev/hda1
VG Name               myvg
PV Size               1.95 GB / NOT usable 4 MB [LVM: 122 KB]
PV#                   1
PV Status             available
Allocatable           yes (but full)
Cur LV                1
PE Size (KByte)       4096
Total PE              499
Free PE               0
Allocated PE          499
PV UUID               Sd44tK-9IRw-SrMC-MOkn-76iP-iftz-OVSen7
```
Remove the physical volume
```shell
$ vgreduce <groupname> /dev/hda1
```

* Creating a logical volume
To create a 1500MB linear LV named 'testlv' and its block device special '/dev/testvg/testlv':
```shell
$ lvcreate -L1500 -ntestlv testvg
```
To create a 100 LE large logical volume with 2 stripes and stripe size 4 KB.
```shell
$ lvcreate -i2 -I4 -l100 -nanothertestlv testvg
```
To create an LV that uses the entire VG
```shell
$ vgdisplay testvg | grep "Total PE"
Total PE              10230 <--- using this value
$ lvcreate -l 10230 testvg -n mylv
```
To create an LV that use all the free VG
```shell
$ vgdisplay -v testvg | grep "Free PE"
Total PE / Free PE             10230 / 190230 <--- using this value
$ lvcreate -l 10230 testvg -n mylv
```
To allocate the logical volumene from a specific physical volume in the volume group.
```shell
$ lvcreate -L 1500 -ntestlv testvg /dev/sdg
```
Before mount lv, run `mkfs` to create file system
```shell
mkfs xfs /dev/mapper/testvg-mylv
```

* Removing a logical volume
```shell
$ umount /dev/myvg/homevol
$ lvremove /dev/myvg/homevol
lvremove -- do you really want to remove "/dev/myvg/homevol"? [y/n]: y
lvremove -- doing automatic backup of volume group "myvg"
lvremove -- logical volume "/dev/myvg/homevol" successfully removed
```

* Extending a logical volume

```shell
$ lvextend -L12G /dev/myvg/homevol
lvextend -- extending logical volume "/dev/myvg/homevol" to 12 GB
lvextend -- doing automatic backup of volume group "myvg"
lvextend -- logical volume "/dev/myvg/homevol" successfully extended

$ lvextend -L+1G /dev/myvg/homevol
lvextend -- extending logical volume "/dev/myvg/homevol" to 13 GB
lvextend -- doing automatic backup of volume group "myvg"
lvextend -- logical volume "/dev/myvg/homevol" successfully extended
```
Resizing file system
**ext2/ext3**

```shell
$ umount /dev/myvg/homevol/dev/myvg/homevol
$ resize2fs /dev/myvg/homevol
$ mount /dev/myvg/homevol /home

or

$ umount /dev/myvg/homevol/dev/myvg/homevol
$ ext2resize /dev/myvg/homevol
$ mount /dev/myvg/homevol /homek
```
**reiserfs**
```shell
$ resize_reiserfs -f /dev/myvg/homevol

or

$ umount /dev/myvg/homevol
$ resize_reiserfs /dev/myvg/homevol
$ mount -treiserfs /dev/myvg/homevol /home
```
**xfs**
```shell
$ xfs_growfs /home
```
**jfs**
```shell
$ mount -o remount,resize /home
```

* Reducing a logical volume
There is no way to shrink XFS and JFS file system.
**ext2**

```shell
$ umount /home
$ e2fsadm -L-1G /dev/myvg/homevol
$ mount /home

or

$ umount /home
$ resize2fs /dev/myvg/homevol 524288
$ lvreduce -L-1G /dev/myvg/homevol
$ mount /home
```
**reiserfs**
```shell
$ umount /home
$ resize_reiserfs -s-1G /dev/myvg/homevol
$ lvreduce -L-1G /dev/myvg/homevol
$ mount -treiserfs /dev/myvg/homevol /home
```

Reference:
<http://tldp.org/HOWTO/LVM-HOWTO/initdisks.html>
