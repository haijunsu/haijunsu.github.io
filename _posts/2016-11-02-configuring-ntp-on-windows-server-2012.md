---
id: 42
title: Configuring NTP on Windows Server 2012
date: 2016-11-02T11:02:24+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=42
permalink: /2016/11/02/configuring-ntp-on-windows-server-2012/
categories:
  - Windows
  - Windows 2012
tags:
  - Windows 2012 NTP Sync Time
---
Original: http://www.sysadminlab.net/windows/configuring-ntp-on-windows-server-2012

Run using PowerShell as Administrator:

<pre class="prettyprint">w32tm /config /manualpeerlist:pool.ntp.org /syncfromflags:MANUAL
Stop-Service w32time
Start-Service w32time</pre>

Check status:

<pre class="prettyprint">w32tm /query /status</pre>

Force a resnyc

<pre class="prettyprint">w32tm /resync</pre>

Start from scratch:

<pre class="prettyprint">Stop-Service w32time
w32tm /unregister
w32tm /register</pre>