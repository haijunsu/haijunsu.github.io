---
title: Install Custom Fonts on Chromebook
author: Haijun (Navy) Su
layout: post
tags: [chromebook, fonts]
---
Chrome can use fonts over internet. There are a lot fonts we can use. I installed custom fonts because I couldn't find a way let chrome to use [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts) over internet.

Assume the chromebook has already enabled developer mode.

Click CTRL+ALT+FROWARD(->) to enter console and login as root
```shell
localhost$ chromeos-firmwareupdate --mode=todev
localhost$ cd /usr/share/vboot/bin
localhost$ ./make_dev_ssh.sh # see the partition number in output. Mine is 2
localhost$ ./make_dev_ssh.sh --remove_rootfs_verification --partitions 2 # the number is from previous command output
localhost$ reboot
```
After reboot, re-enter console
```shell
localhost$ cd /usr/share/fonts/croscore
# copy your fonts here then run the following command
localhost$ fc-cache -f .
```

Now Click CTRL+ALT+BACK(<-) to chrome browser and choose your font.
