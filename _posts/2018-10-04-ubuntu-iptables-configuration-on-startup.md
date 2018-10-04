---
title: Ubuntu Iptables Configuration on Startup
author: Haijun (Navy) Su
layout: post
tags: [iptables, ubuntu]
---

* Save iptables rules
```shell
sudo sh -c "iptables-save > /etc/iptables.rules"
```

* Load iptables rules after startup (script /etc/network/if-pre-up.d/iptablesload)
```shell
#!/bin/sh
iptables-restore < /etc/iptables.rules
exit 0
```

* Save iptables rules after interface shutdown (script /etc/network/if-post-down.d/iptablessave)
```shell
#!/bin/sh
iptables-save -c > /etc/iptables.rules
# remove virbr0 (192.168.122.0/24) rules since it will be regenerated after restart
sed -i '/192.168.122/d' /etc/iptables.rules
if [ -f /etc/iptables.downrules ]; then
   iptables-restore < /etc/iptables.downrules
fi
exit 0
```
refer: <https://help.ubuntu.com/community/IptablesHowTo>
