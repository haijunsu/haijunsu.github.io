---
id: 167
title: Dns command, primary DNS server in domain
date: 2016-11-11T13:31:39+00:00
author: Navy Su
layout: post
---
To change DNS from command line: **_dnscmd_**

List all A type records:

~~~bash
> dnscmd <dns-server> /EnumRecords <your domain> . /type A
~~~

Add a A type record:

~~~bash
> dnscmd <dns-server> /RecordAdd <your domain> docker01 A 192.168.1.235
~~~

More information for dnscmd:

~~~bash
> dnscmd /help
~~~

Set the primary DNS server in domain and auto update other DNS servers. Assume the primary DNS server is dns.my.ads.

<img class="alignnone wp-image-169 size-full" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k-dns.png?fit=416%2C498" alt="win2k-dns" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k-dns.png?w=416 416w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k-dns.png?resize=251%2C300 251w" sizes="(max-width: 416px) 85vw, 416px" data-recalc-dims="1" />