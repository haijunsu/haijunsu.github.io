---
id: 156
title: How to install ZFS on Fedora 24
date: 2016-11-11T00:34:19+00:00
author: Navy Su
layout: post
---
```bash
$ sudo dnf install http://download.zfsonlinux.org/fedora/zfs-release$(rpm -E %dist).noarch.rpm

$ gpg --quiet --with-fingerprint /etc/pki/rpm-gpg/RPM-GPG-KEY-zfsonlinux

pub  2048R/F14AB620 2013-03-21 ZFS on Linux &lt;zfs@zfsonlinux.org&gt;

    Key fingerprint = C93A FFFD 9F3F 7B03 C310  CEB6 A9D5 A1C0 F14A B620

    sub  2048R/99685629 2013-03-21

$ sudo dnf install kernel-devel zfs
```

Run in error with the command:

```bash
$ sudo modprobe zfs

modprobe: FATAL: Module zfs not found in directory /lib/modules/4.5.5-300.fc24.x86_64

```

Solution (Rootcause is the header version is 4.8.6 which is higher than $(uname -r)):

```bash
$ dkms status

spl, 0.6.5.8: added

zfs, 0.6.5.8: added

$ sudo dkms install spl/0.6.5.8

Error! echo

Your kernel headers for kernel 4.5.5-300.fc24.x86_64 cannot be found at

/lib/modules/4.5.5-300.fc24.x86_64/build or /lib/modules/4.5.5-300.fc24.x86_64/source.

$ sudo dnf info kernel-header*

Last metadata expiration check: 0:24:21 ago on Fri Nov 11 00:28:19 2016.

Installed Packages

Name        : kernel-headers

Arch        : x86_64

Epoch       : 0

Version     : 4.8.6

Release     : 201.fc24

Size        : 3.7 M

Repo        : @System

From repo   : updates

Summary     : Header files for the Linux kernel for use by glibc

URL         : http://www.kernel.org/

License     : GPLv2 and Redistributable, no modification permitted

Description : Kernel-headers includes the C header files that specify the interface

            : between the Linux kernel and userspace libraries and programs.  The

            : header files define structures and constants that are needed for

            : building most standard programs and are also needed for rebuilding the

            : glibc package.

$ sudo dnf install kernel-devel-$(uname -r)

$ sudo dkms install spl/0.6.5.8

$ sudo dkms install zfs/0.6.5.8

$ sudo modprobe zfs

$ sudo lsmod |grep zfs

zfs                  2686976  0

zunicode              331776  1 zfs

zavl                   16384  1 zfs

zcommon                49152  1 zfs

znvpair                77824  2 zfs,zcommon

spl                    98304  3 zfs,zcommon,znvpair

```

Reference: <https://github.com/zfsonlinux/zfs/wiki/Fedora>