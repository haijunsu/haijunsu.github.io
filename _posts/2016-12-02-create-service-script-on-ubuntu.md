---
id: 290
title: Create service script on Ubuntu
date: 2016-12-02T10:42:09+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=290
permalink: /2016/12/02/create-service-script-on-ubuntu/
categories:
  - Linux
  - Ubuntu
tags:
  - auto
  - start
  - startup
  - sytemd
---
Creating service script

<pre class="prettyprint">$ vi myservice.sh
#!/bin/bash
...
case "$1" in
  (start)
    # start app command here
    ;;

  (stop)
    # stop app command here
    ;;

  (restart)
    # restart app command here
    ;;

  (*)
    echo "Unknown action!"
    exit 1
    ;;
esac
exit 0</pre>

Creating server configuration file

<pre class="prettyprint">$ sudo vi /etc/systemd/myservice.service
[Unit]
Description=Job that runs the my application

[Service]
User=testuser
Group=testgroup
Type=forking
ExecStart=&lt;path&gt;/myservice.sh start
ExecStop=&lt;path&gt;myservice.sh stop
ExecReload=&lt;path&gt;myservice.sh restart

[Install]
WantedBy=multi-user.target
</pre>

Testing your service

<pre class="prettyprint">$ sudo systemctl start myservice
$ sudo systemctl status myservice</pre>

Enable your service

<pre class="prettyprint">$ sudo systemctl enable myservice</pre>

Reference:
  
<a href="https://wiki.ubuntu.com/SystemdForUpstartUsers" target="_blank">https://wiki.ubuntu.com/SystemdForUpstartUsers</a>
  
<a href="http://stackoverflow.com/questions/33955604/start-a-python-script-at-boot-on-ubuntu" target="_blank">http://stackoverflow.com/questions/33955604/start-a-python-script-at-boot-on-ubuntu</a>