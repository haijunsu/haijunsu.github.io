---
id: 45
title: Add a new drive in CentOS
date: 2016-11-02T15:44:08+00:00
author: Navy Su
layout: post
---
List all drives

~~~bash
ls /dev/sd*

/dev/sda  /dev/sda1  /dev/sda2  /dev/sdb
~~~

Create Linux partitions

~~~bash
$ sudo fdisk /dev/sdb

Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.

Be careful before using the write command.

Device does not contain a recognized partition table

Building a new DOS disklabel with disk identifier 0x59179040.

WARNING: The size of this disk is 36.0 TB (35997194649600 bytes).

DOS partition table format can not be used on drives for volumes

larger than (2199023255040 bytes) for 512-byte sectors. Use parted(1) and GUID

partition table format (GPT).

The device presents a logical sector size that is smaller than

the physical sector size. Aligning to a physical sector (or optimal

I/O) size boundary is recommended, or performance may be impacted.

Command (m for help): g

Building a new GPT disklabel (GUID: FEA1CC8D-685D-4B70-B533-3D758B387762)

Command (m for help): n

Partition number (1-128, default 1):

First sector (2048-70307020766, default 2048):

Last sector, +sectors or +size{K,M,G,T,P} (2048-70307020766, default 70307020766):

Created partition 1

Command (m for help): p

Disk /dev/sdb: 35997.2 GB, 35997194649600 bytes, 70307020800 sectors

Units = sectors of 1 * 512 = 512 bytes

Sector size (logical/physical): 512 bytes / 4096 bytes

I/O size (minimum/optimal): 4096 bytes / 4096 bytes

Disk label type: gpt

#         Start          End    Size  Type            Name

 1         2048  70307020766   32.8T  Linux filesyste

Command (m for help): w

The partition table has been altered!

Calling ioctl() to re-read partition table.

Syncing disks.

~~~

Check result:

~~~bash
$ ls /dev/sd*

/dev/sda  /dev/sda1  /dev/sda2  /dev/sdb  /dev/sdb1
~~~

Create a file system

~~~bash
$ sudo mkfs.ext4 -L /data /dev/sdb1

mke2fs 1.42.9 (28-Dec-2013)

Filesystem label=/data

OS type: Linux

Block size=4096 (log=2)

Fragment size=4096 (log=2)

Stride=0 blocks, Stripe width=0 blocks

549273600 inodes, 8788377339 blocks

439418866 blocks (5.00%) reserved for the super user

First data block=0

268200 block groups

32768 blocks per group, 32768 fragments per group

2048 inodes per group

Superblock backups stored on blocks:

	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,

	4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968,

	102400000, 214990848, 512000000, 550731776, 644972544, 1934917632,

	2560000000, 3855122432, 5804752896

Allocating group tables: done

Writing inode tables: done

Creating journal (32768 blocks): done

Writing superblocks and filesystem accounting information: done
~~~

Create mount point

~~~bash
sudo mkdir /data
~~~

Modify fstab file to automatically mount the file system

~~~bash
$ sudo vi /etc/fstab

# add the following line at the end

LABEL=/data /data ext4 defaults 1 2
~~~

Mount filesystem

~~~bash
$ sudo mount -a

$ df -h

....

/dev/sdb1                    33T   20K   31T   1% /data
~~~