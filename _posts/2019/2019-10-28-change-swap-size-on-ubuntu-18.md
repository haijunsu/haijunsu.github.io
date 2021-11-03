---
title: Change Swap Size on Ubuntu 18
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, swap]
---

From Ubuntu 17, the swap partition has been changed as img file. It makes it easy to reszie the swap partition.

We can resize existing swap file `/swap.img` or replace it with a new swap file (need to update /etc/fstab)

#### Turn off all swap processes

```
# sudo swapoff -a
```

#### Resize the swap file size

```
# sudo dd if=/dev/zero of=/swap.img bs=1G count=8
```
if = input file
of = output file
bs = block size
count = multiplier of blocks

#### Bake swap file

```
# sudo chmod 600 /swap.img
# sudo mkswap /swap.img
```

#### Activate the swap file

```
# sudo swapon /swap.img
```

#### Check the amount of swap available

```
# grep 'Swap' /proc/meminfo

# free
```

#### Update /etc/fstab
```
/swap.img    swap                    swap    defaults        0 0
```


#### Reference
<https://bogdancornianu.com/change-swap-size-in-ubuntu/>

<https://askubuntu.com/questions/178712/how-to-increase-swap-space>
