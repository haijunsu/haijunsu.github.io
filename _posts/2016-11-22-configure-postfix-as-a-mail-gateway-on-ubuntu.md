---
id: 226
title: Configure Postfix as a mail gateway on Ubuntu
date: 2016-11-22T09:20:20+00:00
author: Navy Su
layout: post
---
Edit /etc/postfix/main.cf

```bash
...

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

...
```

Edit /etc/postfix/master.cf to comment local engine

```bash
...

retry     unix  -       -       y       -       -       error

discard   unix  -       -       y       -       -       discard

# local     unix  -       n       n       -       -       local

virtual   unix  -       n       n       -       -       virtual

lmtp      unix  -       -       y       -       -       lmtp

...
```

Create file /etc/postfix/virtual

```bash
postmaster     postmaster@domain1.com

abuse          abuse@domain1.com
```

Create file /etc/postfix/transport

```bash
domain1.com       smtp:10.0.224.10

domain2.com       smtp:10.0.218.11
```

Run postmap

```bash
sudo postmap /etc/postfix/virtual

sudo postmap /etc/postfix/transport
```

Restore Postfix

```bash
sudo systemctl restart postfix
```

Reference:<a href="http://www.postfix.org/STANDARD_CONFIGURATION_README.html" target="_blank">http://www.postfix.org/STANDARD_CONFIGURATION_README.html</a>