---
id: 144
title: Change hostname on CentOS/Fedora
date: 2016-11-10T00:05:33+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=144
permalink: /2016/11/10/change-centoos-hostname/
categories:
  - CentOS
  - Fedora
  - Linux
tags:
  - centos
  - Fedora
  - hostname
---
<?prettify linenums=true?>

<pre class="prettyprint">$ sudo hostnamectl set-hostname --static "YOUR-HOSTNAME-HERE"
</pre>

If the hostname cannot be saved on Fedora after reboot, using the following command to fix it.
  
<?prettify linenums=true?>

<pre class="prettyprint">$ sudo restorecon -v /etc/hostname
</pre>

This works on CentOS

<pre class="prettyprint">$ sudo vi /etc/sysconfig/network
HOSTNAME=myserver.domain.com

$ sudo vi /etc/hosts

$ sudo vi /etc/hostname</pre>