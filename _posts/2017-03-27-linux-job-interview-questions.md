---
id: 436
title: Linux Job Interview Questions
date: 2017-03-27T11:26:14+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=436
permalink: /2017/03/27/linux-job-interview-questions/
categories:
  - Linux
tags:
  - interview
  - linux
---
  1. How can you see which kernel version a system is currently running?

<pre class="prettyprint">uname -a  // Show hostname, current version, current release

uname -v  //Show current version

uname -r  // Show current release</pre>

2.How can you check a system&#8217;s current IP address?
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">ifconfig
ip addr show
ip addr show eth0</pre>

3. How do you check for free disk space?

<pre class="prettyprint">df -ah</pre>

4. How dow you manage services on a system?

<pre class="prettyprint">service &lt;service name&gt; status
systemctl status &lt;service name&gt;</pre>

5. How would you check the size of a directory&#8217;s contents on disk?

<pre class="prettyprint">du -sh &lt;directory name&gt;</pre>

6. How would you check for open ports on a Linux machine?

<pre class="prettyprint">netstat
sudo netstat  -tulpn</pre>

7. How do you check CPU usage for a process?

<pre class="prettyprint">ps aux |grep &lt;process name&gt; 
top
htop
</pre>

8. Dealing with Mounts

<pre class="prettyprint">ls /mnt
mount &lt;device/network drive&gt; &lt;mount point&gt;
/etc/fstab
</pre>

9. How do you look up something you don&#8217;t know?

<pre class="prettyprint">man &lt;command&gt;
&lt;command&gt; --h
google</pre>

&nbsp;