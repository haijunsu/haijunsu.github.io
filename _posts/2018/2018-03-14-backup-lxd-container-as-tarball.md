---
title: Backup LXD Container as Tarball
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, lxc, lxd, container, backup]
---

### Backup
```shell
lxc snapshot <container name> backup
lxc publish <container name>/backup --alias <container name>-backup
lxc image export <container name>-backup lxd_<container name>_tarball
lxc image delete <container name>-backup
lxc delete <container name>/backup
```

### Restore on a new machine
```shell
lxc image import <tarball file name> --alias <container name>-backup
lxc launch <container name>-backup <some-container-name>
lxc image delete <container name>-backup
```

Reference: <https://discuss.linuxcontainers.org/t/backup-the-container-and-install-it-on-another-server/463/2>
