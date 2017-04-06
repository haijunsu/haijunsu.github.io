---
id: 305
title: Clear local DNS cache
date: 2016-12-06T10:45:38+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=305
permalink: /2016/12/06/clear-local-dns-cache/
categories:
  - Linux
  - Mac
  - Windows
tags:
  - dns
  - linux
  - MAC
  - osx
  - windows
---
On Mac OSX

<pre class="prettyprint">sudo killall -HUP mDNSResponder</pre>

On Mac OSX 10.10.0 – 10.10.3
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo discoveryutil mdnsflushcache</pre>

On Mac OSX 10.5 – 10.6
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo dscacheutil -flushcache</pre>

On Windows
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">ipconfig /flushdns</pre>

On Linux
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">/etc/init.d/named restart
/etc/init.d/nscd restart</pre>

Reference: <a href="https://coolestguidesontheplanet.com/clear-the-local-dns-cache-in-osx/" target="_blank">https://coolestguidesontheplanet.com/clear-the-local-dns-cache-in-osx/</a>