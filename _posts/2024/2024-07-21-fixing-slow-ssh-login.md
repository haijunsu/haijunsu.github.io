---
title: fixing slow SSH login
author: Haijun (Navy) Su
layout: post
tags: [ssh, openssh]
---

### Disable using DNS for sshd by creating `/etc/ssh/sshd_config.d/00-my_ssh_config.conf`

```properties
UseDNS no
```

### Common out `pam_systemd.so` in `/etc/pam.d/common-session` if `UseDNS no` doesn't work

```properties
# session optional pam_systemd.so
```
