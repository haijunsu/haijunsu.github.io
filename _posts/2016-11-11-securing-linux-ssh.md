---
id: 171
title: Securing Linux SSH
date: 2016-11-11T23:57:54+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=171
permalink: /2016/11/11/securing-linux-ssh/
categories:
  - CentOS
  - Fedora
  - Linux
tags:
  - centos
  - Fedora
  - linux
  - secure
  - ssh
---
<pre class="prettyprint">$ sudo vi /etc/ssh/sshd_config
# Run ssh on a non-standard port:
Port 2345 # Change the port as you want 

# Disable protocol 1
# Protocol 2,1
Protocol 2

# Prevent root logins:
PermitRootLogin no

# Limit user logins:
AllowUsers alice bob

# Disable password authentication forcing use of keys
PasswordAuthentication no</pre>

How to generate your own private key

<pre class="prettyprint">$ ssh-keygen -t rsa</pre>