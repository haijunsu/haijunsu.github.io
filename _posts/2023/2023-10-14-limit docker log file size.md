---
title: Limit docker log file size
author: Haijun (Navy) Su
layout: post
tags: [Docker, log]
---

* Global

```
sudo cat <<EOF > /etc/docker/daemon.json
{
  "live-restore": true,
  "storage-driver": "overlay2",
  "log-opts": {
    "max-size": "10m"
  }
}
EOF
sudo systemctl restart docker
```


* Using Docker-compose

```
services:
  app:
    container_name: app
    image: node
    restart: always
    volumes:
      - ./app:/home/node/app
    working_dir: /home/node/app
    ports:
      - 3000:3000
    networks:
      - main
    command: "npm start" 
    logging:
      driver: "json-file"
      options:
        max-file: "5"   # number of files or file count
        max-size: "10m" # file size

  db:
    ...
    logging:
      driver: "json-file"
      options:
        max-file: "3"   # number of files or file count
        max-size: "10m" # file size

```


Reference: 

<https://stackoverflow.com/questions/57678774/is-there-a-way-to-specify-file-size-limit-for-docker-logs-on-google-container-op>
