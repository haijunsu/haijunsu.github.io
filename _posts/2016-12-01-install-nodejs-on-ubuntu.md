---
id: 283
title: Install nodejs on ubuntu
date: 2016-12-01T15:42:29+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=283
permalink: /2016/12/01/install-nodejs-on-ubuntu/
categories:
  - nodejs
tags:
  - nodejs
  - pm2
  - ubuntu
---
Installing nodejs<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo apt install nodejs
sudo apt-get install npm</pre>

Installing pm2<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo npm install pm2@latest -g
cd /usr/bin
sudo ln -s nodejs node</pre>

Create user to run nodejs

<pre class="prettyprint">sudo useradd nodeuser
sudo passwd nodeuser
sudo addgroup nodejs
sudo adduser nodeuser nodejs</pre>

Using pm2 to start nodejs app<!--?prettify linenums=true?-->

<pre class="prettyprint">pm2 start hello.js</pre>

Using pm2 to autostart nodejs apps

<pre class="prettyprint">sudo env PATH=$PATH:/usr/local/bin pm2 startup -u nodeuser
sudo su -c "chmod +x /etc/init.d/pm2-init.sh && update-rc.d pm2-init.sh defaults"
pm2 save</pre>