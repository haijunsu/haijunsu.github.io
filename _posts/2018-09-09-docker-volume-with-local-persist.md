---
title: Docker Volume with Local Persist
author: Haijun (Navy) Su
layout: post
tags: [docker, linux, volume, local, persist]
---

Create a docker volume with mount-point using local-persist docker plugin. (Ubuntu only. For other OS please refer to <https://github.com/CWSpear/local-persist>)
* Install
```shell
curl -fsSL https://raw.githubusercontent.com/CWSpear/local-persist/master/scripts/install.sh | sudo bash -s -- --systemd
```

* Using with docker-compose
```
version: '2'

services:
  one:
    image: alpine
    working_dir: /one/
    command: sleep 600
    volumes:
      - data:/one/

  two:
    image: alpine
    working_dir: /two/
    command: sleep 600
    volumes:
      - data:/two/

volumes:
  data:
    driver: local-persist
    driver_opts:
      mountpoint: /data/local-persist/data
```

* Using with docker command
```shell
docker volume create -d local-persist -o mountpoint=/data/images --name=images
```

Reference:
<https://github.com/CWSpear/local-persist>
