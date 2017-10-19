---
title: Docker
author: Haijun (Navy) Su
layout: page
permalink: /cheatsheets/docker
---
Docker Cheat Sheet:
### Exit Docker console
~~~
^p + ^q
~~~

### Copy files between Docker container and host
~~~
docker cp <containerId>:/file/path/within/container /host/path/target
~~~

<https://medium.com/towards-data-science/how-to-deploy-a-mongodb-replica-set-using-docker-6d0b9ac00e49>

### Find the dependent child images on Docker
```bash
docker inspect --format='{{.Id}} {{.Parent}}' $(docker images --filter since=<image id> -q)
```

