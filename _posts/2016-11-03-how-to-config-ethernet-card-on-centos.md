---
id: 77
title: How to config ethernet card on CentOS
date: 2016-11-03T22:41:57+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=77
permalink: /2016/11/03/how-to-config-ethernet-card-on-centos/
categories:
  - CentOS
  - Linux
tags:
  - centos
  - network
---
Using network manager to config network<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo nmtui</pre>

After modify items, restart the network service

<pre class="prettyprint">sudo service network restart
</pre>