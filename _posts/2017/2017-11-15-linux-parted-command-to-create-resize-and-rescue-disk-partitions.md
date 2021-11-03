---
title: Linux Parted Command to Create, Resize and Rescue Disk Partitions
author: Haijun (Navy) Su
layout: post
tags: [Linux, parted, partition, disk]
---
Running `parted` command with ROOT user

* List Disk Partitions

```shell
$ sudo parted
GNU Parted 3.1
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) print
Model: DELL PERC H730 Mini (scsi)
Disk /dev/sda: 3599GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags: pmbr_boot

Number  Start   End     Size    File system  Name  Flags
 1      1049kB  2097kB  1049kB                     bios_grub
 2      2097kB  1076MB  1074MB  xfs
 3      1076MB  3599GB  3598GB                     lvm
```

* Switch to Different Disk
```shell
(parted) select /dev/sdb
Using /dev/sdb
```

* Create Partition in Linux
To create new partition, parted uses `mkpart`. THe partition type can be `primary` or `logical`
```shell
(parted) mklabel msdos
(mkpart) mkpart
Partition type?  primary/extended? primary
File system type?  [ext2]?
Start? 1
End? 10000
(parted) print
Model: ATA VBOX HARDDISK (scsi)
Disk /dev/sdb: 34.4GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:
Number  Start   End     Size    Type     File system  Flags
1      1049kB  10.0GB  9999MB  primary  ext2         lba
(parted) quit
```
Format new partition in ext4 file system
```shell
$ mkfs.ext4 /dev/sdb1
```

* Resize Disk Partition
```shell
(parted) resizepart
Partition number? 1
End?  [10.0GB]? 15000
```

* Delete Disk Partition
```shell
(parted) rm 1
```

* Rescue Disk Partition
```shell
(parted) rescue
Start? 1
End? 15000
(parted) print
Model: Unknown (unknown)
Disk /dev/sdb1: 15.0GB
Sector size (logical/physical): 512B/512B
Partition Table: loop
Disk Flags:
Number Start End Size File system Flags
1 0.00B 15.0GB 15.0GB ext4
```

* Change the State of Partition Flag (on/off)
The support flags are: boot, root, swap, hidden, raid, lvm, lba, legacy_boot, irst, esp, palo
```shell
(parted) set 2 lba on
```

Reference:
<https://www.tecmint.com/parted-command-to-create-resize-rescue-linux-disk-partitions/>
