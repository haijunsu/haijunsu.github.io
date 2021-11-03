---
title: Install and Configure Fail2ban on Ubuntu
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, fail2ban]
---

## Install from the default Ubuntu repositories
```
$ sudo apt update
$ sudo apt install fail2ban
$ sudo systemctl status fail2ban
```

## Fail2ban Configuration
1. Create a `.local` configuration file from the default jail.conf
```
$ cd /etc/fail2ban
$ sudo cp jail.conf jail.local
```

2. Modify `jail.local`

```
ignoreip = 127.0.0.1/8 ::1 192.168.1.0/24

# if it is a negative number, it will ban permanently.
bantime = 1d

findtime = 10m

maxretry = 5

# Email notification
action = %(action_mw)s
destemail = admin@mydomain.com
sender = root@myserver.com

# SSH jail
[sshd]
enabled = true
maxretry = 3
findtime = 1d
bantime = 4w
ignoreip = 127.0.0.1/8 ::1 192.168.1.0/24
```

## Restart the fail2ban service
```
$ sudo systemctl restart fail2ban
$ sudo systemctl status fail2ban
```

## Check status from Fail2ban Client

1. Check the jail status:
```
$ sudo fail2ban-client status sshd
```

2. Unban an IP:
```
$ sudo fail2ban-client set sshd unbanip 123.12.3.123
```

3. Ban an IP:
```
$ sudo fail2ban-client set sshd banip 123.12.3.123
```

Reference:
<https://linuxize.com/post/install-configure-fail2ban-on-ubuntu-20-04/>

