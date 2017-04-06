---
id: 446
title: Docker USER and named volume
date: 2017-03-29T16:28:31+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=446
permalink: /2017/03/29/docker-user-and-named-volume/
categories:
  - Uncategorized
tags:
  - docker
  - linux
  - secure
  - volume
---
To secure docker, we use a specific user instead of root. We add the following code in Dockerfile.<!--?prettify linenums=true?-->

<pre class="prettyprint">RUN useradd -u 2000 wwwuser
USER wwwuser</pre>

Those code create user with uid=2000.
  
Since host volume is mounted as root user, all files and folders is readonly for user wwwuser. If the wwwuser needs to write files to volume, we can create a **named volume** for it.
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">docker volume create --driver local --opt type=tmpfs --opt device=tmpfs  --opt o=uid=2000,gid=2000,size=2g,mode=0750 myHomeVolume</pre>

Use the following command to run container
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">docker run -d -v myHomeVolume:/home/wwwuser --name myapps &lt;image&gt;</pre>

TO backup the data, taring all files at &#8216;/var/lib/docker/volumes/myHomeVolume/_data&#8217; with root.