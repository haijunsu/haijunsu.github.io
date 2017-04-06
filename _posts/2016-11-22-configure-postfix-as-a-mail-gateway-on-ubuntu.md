---
id: 226
title: Configure Postfix as a mail gateway on Ubuntu
date: 2016-11-22T09:20:20+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=226
permalink: /2016/11/22/configure-postfix-as-a-mail-gateway-on-ubuntu/
categories:
  - Linux
  - Ubuntu
tags:
  - gateway
  - linux
  - mail
  - postfix
  - ubuntu
---
Edit /etc/postfix/main.cf

<pre class="prettyprint">...
myorigin = /etc/mailname
mydestination =
local_recipient_maps =
local_transport = error:local mail delivery is disabled
virtual_alias_maps = hash:/etc/postfix/virtual
relay_domains = domain1.com domain2.com
parent_domain_matches_subdomains = debug_peer_list smtpd_access_maps
smtpd_relay_restrictions = permit_mynetworks reject_unauth_destination
smtpd_recipient_restrictions =
transport_maps = hash:/etc/postfix/transport
...</pre>

Edit /etc/postfix/master.cf to comment local engine

<pre class="prettyprint">...
retry     unix  -       -       y       -       -       error
discard   unix  -       -       y       -       -       discard
# local     unix  -       n       n       -       -       local
virtual   unix  -       n       n       -       -       virtual
lmtp      unix  -       -       y       -       -       lmtp
...</pre>

Create file /etc/postfix/virtual

<pre class="prettyprint">postmaster     postmaster@domain1.com
abuse          abuse@domain1.com</pre>

Create file /etc/postfix/transport

<pre class="prettyprint">domain1.com       smtp:10.0.224.10
domain2.com       smtp:10.0.218.11</pre>

Run postmap<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo postmap /etc/postfix/virtual
sudo postmap /etc/postfix/transport</pre>

Restore Postfix<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo systemctl restart postfix</pre>

Reference:<a href="http://www.postfix.org/STANDARD_CONFIGURATION_README.html" target="_blank">http://www.postfix.org/STANDARD_CONFIGURATION_README.html</a>