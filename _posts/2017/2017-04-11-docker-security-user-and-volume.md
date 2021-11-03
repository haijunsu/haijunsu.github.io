---
layout: post
title: Secure Docker using USER and Volume
---

### Issue
Docker user has root privilege on host. The default user in container is root. In order to secure docker, we can create a user in docker container and run as non privilege user. The problem is that some services in docker need to write data to disk. E.g. druple has a files folder to store user uploaded files.

### Solution
1. Create a volume and assign uid and mode
~~~shell
docker volume create --driver local --opt type=tmpfs --opt device=tmpfs --opt o=uid=2000,gid=2000,size=2g,mode=0750 dataVolume
~~~
2. Create user in container has same uid
~~~Dockerfile
FROM python:3.5
...
RUN useradd -u 2000 energyUser
USER energyUser
...
~~~
3. Add docker volume into container by -v argument
~~~shell
docker run -it -p 8080:8000 --name containerName --restart always -v dataVolume:/writeableFolder -d  imageName
~~~

### Backup data volume
Using --volumes-from flog to create a new container that mounts the value
~~~shell
docker run --rm --volumes-from containerName -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /writeableFolder
~~~

### Restart data to data volue
Un-tar backup file in the new container's data volue
~~~shell
docker run --rm --volumes-from containerName -v $(pwd):/backup ubuntu bash -c "cd /writeableFolder && tar xvf /backup/backup.tar --strip 1"
~~~
