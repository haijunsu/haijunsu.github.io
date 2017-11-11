---
id: 79
title: How to regenerate ssh certificate on CentOS
date: 2016-11-03T22:50:34+00:00
author: Navy Su
layout: post
---
For ssh1 protocol:

~~~shell
sudo ssh-keygen -f /etc/ssh/ssh_host_key -N '' -t rsa1
~~~

For ssh2 protocol:

~~~shell
sudo ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N '' -t rsa

sudo ssh-keygen -f /etc/ssh/ssh_host_dsa_key -N '' -t dsa
~~~