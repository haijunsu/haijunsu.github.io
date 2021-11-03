---
title: Run Docker inside LXD
author: Haijun (Navy) Su
layout: post
tags: [Linux, LXD, Docker]
---
To run Docker inside LXD, we need to change the security.nesting as true. 
~~~
lxc launch ubuntu-daily:16.04 docker -c security.nesting=true
~~~
or
~~~
lxc config set docker security.nesting true
lxc restart docker
~~~

If Docker doesn't work properly, try next commands
~~~
lxc config set docker security.privileged true
lxc restart docker
~~~

Refer: <https://stgraber.org/2016/04/13/lxd-2-0-docker-in-lxd-712/>

