---
id: 79
title: How to regenerate ssh certificate on CentOS
date: 2016-11-03T22:50:34+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=79
permalink: /2016/11/03/how-to-regenerate-ssh-certificatesudo/
categories:
  - CentOS
  - Linux
tags:
  - centos
  - key
  - rsa
  - ssh
---
For ssh1 protocol:

<pre class="prettyprint">sudo ssh-keygen -f /etc/ssh/ssh_host_key -N '' -t rsa1</pre>

For ssh2 protocol:

<pre class="prettyprint">sudo ssh-keygen -f /etc/ssh/ssh_host_rsa_key -N '' -t rsa
sudo ssh-keygen -f /etc/ssh/ssh_host_dsa_key -N '' -t dsa</pre>