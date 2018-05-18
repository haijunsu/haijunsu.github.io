---
title: Docker block oubound network traffic
author: Haijun (Navy) Su
layout: post
tags: [docker, iptables]
---

Install iptables in docker and run it in entrypoint.sh. To disable iptables, run `touch myenv/MAINTENANCE` and restart container

### Dockerfile Example

```
FROM node:8-alpine

LABEL maintainer="André König <andre.koenig@gmail.com>"

RUN apk add --update curl iptables sudo && \
    addgroup -S app && adduser -S -g app app && \
    mkdir /myenv

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh", "--"]
```

### entrypoint.sh Example

```shell
#!/usr/bin/env sh

#
# iptables configuration
#
# The following allows in- and outbound traffic
# within a certain `CIDR` (default: `192.168.0.0/24`),
# but blocks all other network traffic.
#
if [ ! -f "/myenv/MAINTENANCE" ]
then
    ALLOW_IPS=$(cat /myenv/allowIPs)
    for ACCEPT_CIDR in ${ALLOW_IPS}; do
        iptables -A INPUT -s ${ACCEPT_CIDR} -j ACCEPT
        iptables -A OUTPUT -d ${ACCEPT_CIDR} -j ACCEPT
    done
    iptables -A INPUT -j REJECT
    iptables -A OUTPUT -j REJECT
fi

#
# After configuring `iptables` as root, execute
# the passed command as the non-privileged `app` user.
#
sudo -u app sh -c "$@"<Paste>
```

### myenv/allowIPs example (allow all private addresses)
```
127/8
10/8
172.16/12
192.168/16
```

### Testing

```shell
# build docker image
docker build -t node-sandbox .
# test outgoing to google.com
docker run --cap-add=NET_ADMIN -it --rm -v "${PWD}"/myenv:/myenv node-sandbox "curl https://google.com"
docker run --privileged -it --rm -v "${PWD}"/myenv:/myenv node-sandbox "curl https://google.com"
# test outgoing to private network
docker run --cap-add=NET_ADMIN -it --rm -v "${PWD}"/myenv:/myenv node-sandbox "curl http://192.168.0.1"
docker run --privileged -it --rm -v "${PWD}"/myenv:/myenv node-sandbox "curl http://192.168.0.1"
# maintenance mode (Open access to upgrade package for 3rd party such as Drupal and Wordpress)
touch myenv/MAINTENANCE
docker run --cap-add=NET_ADMIN -it --rm -v "${PWD}"/myenv:/myenv node-sandbox "curl https://www.google.com"
```

Reference <https://dev.to/andre/docker-restricting-in--and-outbound-network-traffic-67p>
