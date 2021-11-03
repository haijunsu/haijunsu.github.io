---
title: Netplan pre-up-down post-up-down scripts
author: Haijun (Navy) Su
layout: post
tags: [netplan, network, ubuntu]
---

From Ubuntu 18, the network IFUPDOWN has been replaced by NETPLAN. Netplan doesn't provide up/down hook scripts. But we can do it using networkd-dispatcher.

Below is a table mapping networking states and hooks available:

HOOK | IFUPDOWN | NETWORKD-DISPATCHER | NETWORKMANAGER
--- | --- | --- | ---
pre-up |	if-pre-up.d | |	 	pre-up
configuring|	| 	configuring.d|	 
configured|	 |	configured.d|	 
up|	if-up.d|	routable.d|	up
post-up|	if-post-up.d|	routable.d|	 
degraded|	| 	degraded.d|	 
pre-down|	if-pre-down.d|	| 	pre-down
down|	if-down.d|	off.d|	down
post-down|	if-post-down.d|	off.d|	 
no-carrier|	| 	nocarrier.d|	 

Note that in networkd-dispatcher, the hooks run *asychronous*; that is they will not block transition into another state.

Example for an ifupdown legacy hook for post-up/post-down states
The following is an example of using networkd-dispatcher to run existing ifup hooks via a script installed in `/etc/networkd-dispatcher/routable.d/50-ifup-hooks`:

```
#!/bin/sh

for d in up post-up; do
    hookdir=/etc/network/if-${d}.d
    [ -e $hookdir ] && /bin/run-parts $hookdir
done
exit 0
```
Similarly, here is an example of an ifdown hook installed in `/etc/networkd-dispatcher/off.d/50-ifdown-hooks`:
```
#!/bin/sh

for d in down post-down; do
    hookdir=/etc/network/if-${d}.d
    [ -e $hookdir ] && /bin/run-parts $hookdir
done
exit 0
```

Refer:
<https://netplan.io/faq#use-pre-up-post-up-etc-hook-scripts>
