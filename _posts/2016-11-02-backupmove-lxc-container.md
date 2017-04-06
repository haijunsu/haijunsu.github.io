---
id: 51
title: Backup/Move LXC Container
date: 2016-11-02T23:24:14+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=51
permalink: /2016/11/02/backupmove-lxc-container/
categories:
  - lxc
tags:
  - container
  - linux
  - lxc
---
  1. Stop lxc container<!--?prettify linenums=true?-->
    
    <pre class="prettyprint">$ sudo lxc-stop -n &lt;container&gt;</pre>

  2. Archive lxc container. DON&#8217;T forget the option **_&#8216;&#8211;numeric-owner&#8217;._** **The &#8216;&#8211;numeric-owner&#8217; flag is very important! Without it, the container may not boot because the uid/gids get mangled in the extracted filesystem**
  
    <!--?prettify linenums=true?--></p> 
    
    <pre class="prettyprint">$ sudo - su
$ cd /var/lib/lxc/&lt;container&gt;/
$ tar --numeric-owner -czvf container_fs.tar.gz ./*</pre>

  3. Copy the archive file to another server (ftp, sftp, or scp)
  4. Extract files on the new server<!--?prettify linenums=true?-->
    
    <pre class="prettyprint">$ sudo su -
$ mkdir /var/lib/lxc/&lt;container&gt;/
$ cd /var/lib/lxc/&lt;container&gt;/
$ tar --numeric-owner -xzvf container_fs.tar.gz </pre>
    
    reference:
    
    <http://stackoverflow.com/questions/23427129/how-do-i-backup-move-lxc-containers></li> </ol>