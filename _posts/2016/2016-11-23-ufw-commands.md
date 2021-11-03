---
id: 235
title: UFW command examples
date: 2016-11-23T11:56:54+00:00
author: Navy Su
layout: post
---
~~~shell
sudo ufw status

sudo ufw status verbose

sudo ufw status numbered

sudo ufw allow ssh

sudo ufw allow http

sudo ufw allow https

sudo ufw allow mysql

sudo ufw delete allow https

sudo ufw allow to any port 2345

sudo ufw delete allow to any port 2345

sudo ufw allow to any port 2345 proto udp

sudo ufw delete allow to any port 2345 proto udp

sudo ufw allow from 192.168.0.5 to any port 2345

sudo ufw delete allow from 192.168.0.5 to any port 2345

sudo ufw allow from 192.168.0.0/24 to any port 2345

sudo ufw delete allow from 192.168.0.0/24 to any port 2345
~~~