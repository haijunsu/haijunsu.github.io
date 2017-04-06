---
id: 167
title: Dns command, primary DNS server in domain
date: 2016-11-11T13:31:39+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=167
permalink: /2016/11/11/dns-command-primary-dns-server-in-domain/
categories:
  - Windows
  - Windows 2012
tags:
  - dns
  - windows
---
To change DNS from command line: **_dnscmd_**

List all A type records:

<pre class="prettyprint">&gt; dnscmd &lt;dns-server&gt; /EnumRecords &lt;your domain&gt; . /type A</pre>

Add a A type record:

<pre class="prettyprint">&gt; dnscmd &lt;dns-server&gt; /RecordAdd &lt;your domain&gt; docker01 A 192.168.1.235</pre>

More information for dnscmd:

<pre class="prettyprint">&gt; dnscmd /help</pre>

Set the primary DNS server in domain and auto update other DNS servers. Assume the primary DNS server is dns.my.ads.

<img class="alignnone wp-image-169 size-full" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k-dns.png?fit=416%2C498" alt="win2k-dns" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k-dns.png?w=416 416w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k-dns.png?resize=251%2C300 251w" sizes="(max-width: 416px) 85vw, 416px" data-recalc-dims="1" />