---
title: Docker
author: Haijun (Navy) Su
layout: page
permalink: /cheatsheets/docker
---
Docker Cheat Sheet:
### Exit Docker console
```
^p + ^q
```

### Copy files between Docker container and host
```
docker cp <containerId>:/file/path/within/container /host/path/target
```

<https://medium.com/towards-data-science/how-to-deploy-a-mongodb-replica-set-using-docker-6d0b9ac00e49>

### Find the dependent child images on Docker
```bash
docker inspect --format='{{.Id}} {{.Parent}}' $(docker images --filter since=<image id> -q)
```

### Removing Docker containers and images
* List all exited containers
```bash
docker ps -aq -f status=exited
docker ps --all
```
* Remove stopped containers
```bash
docker ps -aq --no-trunc | xargs docker rm
```
* Remove dangling/untagged images
```
docker images -q --filter dangling=true | xargs docker rmi
```
* Remove containers created after a specific container
```bash
docker ps --since a1bz3768ez7g -q | xargs docker rm
```
* Remove containers created before a specific container
```bash
docker ps --before a1bz3768ez7g -q | xargs docker rm
```
* Use *--rm* for docker build
Use *--rm* together with *docker build* to remove intermediary images during the build process.

