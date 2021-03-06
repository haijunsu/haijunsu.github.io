---
id: 436
title: Linux Job Interview Questions
date: 2017-03-27T11:26:14+00:00
author: Navy Su
layout: post
---
  1. How can you see which kernel version a system is currently running?

~~~shell
uname -a  // Show hostname, current version, current release

uname -v  //Show current version

uname -r  // Show current release
~~~

2.How can you check a system&#8217;s current IP address?
  

~~~shell
ifconfig

ip addr show

ip addr show eth0
~~~

3. How do you check for free disk space?

~~~shell
df -ah
~~~

4. How dow you manage services on a system?

~~~shell
service <service name> status

systemctl status <service name>
~~~

5. How would you check the size of a directory&#8217;s contents on disk?

~~~shell
du -sh <directory name>
~~~

6. How would you check for open ports on a Linux machine?

~~~shell
netstat

sudo netstat  -tulpn
~~~

7. How do you check CPU usage for a process?

~~~shell
ps aux |grep <process name> 

top

htop

~~~

8. Dealing with Mounts

~~~shell
ls /mnt

mount <device/network drive> <mount point>

/etc/fstab

~~~

9. How do you look up something you don&#8217;t know?

~~~shell
man <command>

<command> --h

google
~~~

