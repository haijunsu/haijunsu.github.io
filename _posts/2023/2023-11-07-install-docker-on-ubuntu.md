---
title: Install Docker on Ubuntu
author: Haijun (Navy) Su
layout: post
tags: [docker, ubuntu]
---

There are 2 ways to install `docker` on ubuntu.

## Install docker with `snap`

Docker from `snap` is very easy. It is also install `docker-compose` at the same time. The folder will be `/snap/docker`.

```bash
sudo snap install docker

# update docker
# sudo snap refresh docker # the version 20.10.24 has an issue that reports 'http: invalid Host header'
# sudo snap refresh docker --channel=core18/stable

```

There is no `docker` group created during installation. If you want to use docker as regular user, you need to add the account to `docker` group.

```bash
      sudo addgroup --system docker
      sudo adduser $USER docker
      newgrp docker
      sudo snap disable docker
      sudo snap enable docker
```

## Install docker manual for official repository

* Install basic tool.

```bash

sudo apt-get update

 sudo apt-get install \
 ca-certificates \
 curl \
 gnupg \
  lsb-release

```

* Add Docker's offical GPG key:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg \
--dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

```

* Install the docker repository.

```bash
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

```

* Install docker

```bash

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io

```

* Test docker container

```bash
docker run -it ubuntu echo Hello docker!
```

* Install Docker-compose

```bash
sudo curl -SL https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-linux-x86_64 -o /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose
```

* Verify Docker-compose

```bash

docker-compose version

```

