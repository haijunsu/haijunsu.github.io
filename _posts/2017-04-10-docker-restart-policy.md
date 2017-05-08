---
layout: post
title: Docker restart policies.
---
## Policies:
* no - this is defualt value
* no-failure - restart container if it returns an error exit code. It also supports maximum numbers of times Docker will try.
* unless-stopped - only restart container if it is running after reboot or restart docker service
* always - Always keep the container running

## Setting restart policy using docker run
~~~bash
docker run -d --name container_name --restart always image_name
docker run -d --name container_name --restart on-failure:5 image_name
~~~

## Updating exist contianer
~~~bash
docker update --restart=always container_name
~~~
Reference: [Ensuring Containers Are Always Running with Docker’s Restart Policy](https://blog.codeship.com/ensuring-containers-are-always-running-with-dockers-restart-policy/)
