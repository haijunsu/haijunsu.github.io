---
title: X11Forwarding via SSH
author: Haijun (Navy) Su
layout: post
tags: [x11, xwindows, forwarding, ssh, ubuntu]
---

### On Xwindow server (e.g. Ubuntu Desktop):

* Update /etc/ssh/sshd_config

``` 
X11Forwarding yes
X11DisplayOffset 10
AllowTcpForwarding yes
```

* Restart ssh service

```
sudo systemctl restart sshd
```

### On Linux server which needs to run GUI app.

* Update /etc/ssh/sshd_config

```
ForwardX11 yes
ForwardX11Trusted yes
```

* Update ~/.bash_profile
Fix error: *X11 connection rejected because of wrong authentication*

``` 
export XAUTHORITY=$HOME/.Xauthority
```

### Verify

``` bash
ssh -X <linux server>
firefox
```

### Reference:
<http://blog.linuxjunkie.com/blog/2012/09/26/x11forwarding-via-ssh-ubuntu-lightdm/>

<https://stackoverflow.com/questions/24492820/x11-connection-rejected-because-of-wrong-authentication>

