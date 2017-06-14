---
title: CIFS Samba mount hangs for several minutes
author: Haijun (Navy) Su
layout: post
tags: [cifs,samba,ubuntu]
---
## Symptom
Add a network share folder in /etc/fstab 
~~~
//windows-server/shared /mnt/shared cifs  iocharset=utf8,credentials=/root/.naspasswd,dir_mode=0750,file_mode=0750  0 0
~~~
Most time it works well. But every few days or weeks, the connection or the mount point seems to go dead or hang, such that any process that tries to access the mount point gets stuck in D state (disk, or I/O wait). those processed become impervious to TERM and KILL signals. The frozen state lasts for 5+ minutes.

## Workarround
Add a cron job in /etc/crontab to access the newwork shared folder every minite.
~~~
* * * * *   root    touch /mnt/shared/keepalive
~~~

## Force umount hung network shared folder
~~~
sudo umount -f -a -t cifs -l /mnt/shared
~~~

Source: 
<https://serverfault.com/questions/622238/linux-cifs-samba-mount-hangs-for-several-minutes>
<https://stackoverflow.com/questions/74626/how-do-you-force-a-cifs-connection-to-unmount/96288>
