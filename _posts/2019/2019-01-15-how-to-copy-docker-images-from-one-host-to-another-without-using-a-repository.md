---
title: How to copy Docker images from one host to another without using a repository
author: Haijun (Navy) Su
layout: post
tags: [docker]
---

* Backup docker image to tar a tar file
```
docker save -o <path to image tar file> <image name>
```
* Copy to another machine
* Load image from tar file
```
docker load -i <path to image tar file>
```

If all machines in the same network, we can use one line commands to do it.
```
docker save <image> | bzip2 | \
     ssh user@host 'bunzip2 | docker load'
```
if `pv` command is available, you can also use it to view the transfer status.
```
docker save <image> | bzip2 | pv | \
     ssh user@host 'bunzip2 | docker load'
```


Reference:
<https://stackoverflow.com/questions/23935141/how-to-copy-docker-images-from-one-host-to-another-without-using-a-repository>
