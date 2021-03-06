---
id: 290
title: Create service script on Ubuntu
date: 2016-12-02T10:42:09+00:00
author: Navy Su
layout: post
---
Creating service script

~~~shell
$ vi myservice.sh

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

exit 0
~~~

Creating server configuration file

~~~shell
$ sudo vi /etc/systemd/myservice.service

[Unit]

Description=Job that runs the my application

[Service]

User=testuser

Group=testgroup

Type=forking

ExecStart=<path>/myservice.sh start

ExecStop=<path>myservice.sh stop

ExecReload=<path>myservice.sh restart

[Install]

WantedBy=multi-user.target

~~~

Testing your service

~~~shell
$ sudo systemctl start myservice

$ sudo systemctl status myservice
~~~

Enable your service

~~~shell
$ sudo systemctl enable myservice
~~~

Reference:
  
<a href="https://wiki.ubuntu.com/SystemdForUpstartUsers" target="_blank">https://wiki.ubuntu.com/SystemdForUpstartUsers</a>
  
<a href="http://stackoverflow.com/questions/33955604/start-a-python-script-at-boot-on-ubuntu" target="_blank">http://stackoverflow.com/questions/33955604/start-a-python-script-at-boot-on-ubuntu</a>