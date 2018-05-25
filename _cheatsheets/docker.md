---
title: Docker
author: Haijun (Navy) Su
layout: page
permalink: /cheatsheets/docker
---
Docker Cheat Sheet:
### Exit Docker console
```bash
^p + ^q
```

### Copy files between Docker container and host
```bash
docker cp <containerId>:/file/path/within/container /host/path/target
```

<https://medium.com/towards-data-science/how-to-deploy-a-mongodb-replica-set-using-docker-6d0b9ac00e49>

### Update docker images
```shell
docker images | grep -v REPOSITORY | awk '{printf("%s:%s\n", $1, $2)}' | xargs -L1 docker pull
```

### Find the dependent child images on Docker
{% assign strformat = '{{.Id}} {{.Parent}}' %}
```bash
docker inspect --format='{{ strformat }}' $(docker images --filter since=<image id> -q)
```

### Removing Docker containers and images
* List all exited containers
```bash
docker ps -aq -f status=exited
docker ps --all
```
* Remove stopped containers
```bash
docker container prune
docker ps -aq --no-trunc | xargs docker rm
```
* Remove dangling/untagged images
```
docker image prune
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

### Docker logs
* Clean container's log

```bash
sudo -i
{% raw %}
echo "" > $(docker inspect --format='{{.LogPath}}' <container_name_or_id>)
{% endraw %}
```

* Setting docker daemon configuration file */etc/docker/daemon.json*
```json
{
  "log-driver": "json-file",
  "log-opts": {"max-size": "10m", "max-file": "3"}
}
```

### Push image to Docker hub

```
docker logoin
docker images
docker tag <image id> <yourhubusername>/<imagename>[:image-tag]
```

Example:
```
$ docker images
REPOSITORY              TAG       IMAGE ID         CREATED           SIZE
verse_gapminder_gsl     latest    023ab91c6291     3 minutes ago     1.975 GB
verse_gapminder         latest    bb38976d03cf     13 minutes ago    1.955 GB
rocker/verse            latest    0168d115f220     3 days ago        1.954 GB

$ docker tag bb38976d03cf yourhubusername/verse_gapminder:firsttry
$ docker push yourhubusername/verse_gapminder
```

Source:
<https://blog.octo.com/en/kubernetes-vs-swarm-volumes/>
