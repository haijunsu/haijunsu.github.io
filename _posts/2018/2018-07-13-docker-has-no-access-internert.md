---
title: Docker Containers Have No Access Internert
author: Haijun (Navy) Su
layout: post
tags: [docker internet]
---
**Problem**
Docker containers cannot access the network. The host can normal and containers have no problem to access the host.

**Solution**
Rebuild docker's network
```shell
sudo pkill docker
sudo iptables -t nat -F
sudo ifconfig docker0 down
sudo brctl delbr docker0
sudo service docker restart
```

Reference: <https://stackoverflow.com/questions/20430371/my-docker-container-has-no-internet>
