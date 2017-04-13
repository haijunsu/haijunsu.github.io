---
id: 283
title: Install nodejs on ubuntu
date: 2016-12-01T15:42:29+00:00
author: Navy Su
layout: post
---
Installing nodejs

```bash
sudo apt install nodejs

sudo apt-get install npm
```

Installing pm2

```bash
sudo npm install pm2@latest -g

cd /usr/bin

sudo ln -s nodejs node
```

Create user to run nodejs

```bash
sudo useradd nodeuser

sudo passwd nodeuser

sudo addgroup nodejs

sudo adduser nodeuser nodejs
```

Using pm2 to start nodejs app

```bash
pm2 start hello.js
```

Using pm2 to autostart nodejs apps

```bash
sudo env PATH=$PATH:/usr/local/bin pm2 startup -u nodeuser

sudo su -c "chmod +x /etc/init.d/pm2-init.sh && update-rc.d pm2-init.sh defaults"

pm2 save
```