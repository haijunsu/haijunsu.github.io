---
title: Docker Swarm on CentOS
author: Haijun (Navy) Su
layout: post
tags: [docker, swarm, linux, container, centos]
---

Reference:
<https://docs.docker.com/engine/swarm/swarm-tutorial/>
<https://docs.docker.com/engine/swarm/services/>

Docker swarm ports:
* TCP port 2377 - cluster management communications
* TCP and UDP port 7946 - communication among nodes
* UDP port 4789 - overlay network traffic
* Port 7946 TCP/UDP for container network discovery
* Port 4789 UDP for the container ingress network

```shell

sudo yum remove docker docker-common docker-selinux docker-engine
sudo yum install -y yum-utils   device-mapper-persistent-data   lvm2
sudo yum-config-manager     --add-repo     https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce
yum list docker-ce --showduplicates | sort -r
sudo systemctl start docker
sudo docker run helo-world
sudo usermod -a -G docker <docker user>
# exit and relogin
docker run hello-world
sudo systemctl enable docker
firewall-cmd --state
docker swarm init --advertise-addr <Manager IP>
docker swarm join --token <token> <manager ip>

# check token
docker swarm join-token manager
docker swarm join-token worker

# create service
docker service create --replicas 3 --name <service name> --publish published=3080,target=80 --mount type=bind,src=/home/navysu/projects/myweb,dst=/usr/share/nginx/html nginx

# check service
docker service ps <service id>
docker service inspect --pretty <service id>

# delete service
docker service rm <service name>

# scale service
docker service scale <Service-id>=<number-of-task>

# update service
docker service update --publish-add 80 my_web

```

Command	| Description
---|---
docker node demote |	Demote one or more nodes from manager in the swarm
docker node inspect |	Display detailed information on one or more nodes
docker node ls |	List nodes in the swarm
docker node promote	 |Promote one or more nodes to manager in the swarm
docker node ps |	List tasks running on one or more nodes, defaults to current node
docker node rm |	Remove one or more nodes from the swarm
docker node update |	Update a node

