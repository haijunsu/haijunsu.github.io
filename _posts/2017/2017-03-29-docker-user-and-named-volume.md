---
id: 446
title: Docker USER and named volume
date: 2017-03-29T16:28:31+00:00
author: Navy Su
layout: post
---
To secure docker, we use a specific user instead of root. We add the following code in Dockerfile.

~~~shell
RUN useradd -u 2000 wwwuser

USER wwwuser
~~~

Those code create user with uid=2000.
  
Since host volume is mounted as root user, all files and folders is readonly for user wwwuser. If the wwwuser needs to write files to volume, we can create a **named volume** for it.
  

~~~shell
docker volume create --driver local --opt type=tmpfs --opt device=tmpfs  --opt o=uid=2000,gid=2000,size=2g,mode=0750 myHomeVolume
~~~

Use the following command to run container
  

~~~shell
docker run -d -v myHomeVolume:/home/wwwuser --name myapps <image>
~~~

TO backup the data, taring all files at &#8216;/var/lib/docker/volumes/myHomeVolume/_data&#8217; with root.