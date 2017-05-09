---
id: 192
title: Docker security
date: 2016-11-16T15:33:30+00:00
author: Navy Su
layout: post
---
Detaching from the container without stopping Ctrl-P Ctrl-Q

Create docker user
~~~bash
$ sudo useradd dockeradmin

$ sudo passwd dockeradmin

$ sudo usermod -aG docker dockeradmin
~~~

1. Users are not namespaced. Root in container is root on host. Create a user in Dockerfile. Change to the user via USER or su/sudo/gosu
~~~bash
RUN groupadd -r user && useradd -r -g user user
USER user
~~~
2. Set container FS to read-only
~~~bash
$ docker run --read-only debian touch x
touch: cannot touch 'x': Read-only file system
~~~
3. Set Volumes to read-only/Use Data Volume Containers
~~~bash
$ docker run -v $(pwd)/secrets:/secrets:ro debian touch /secrets/x
touch: cannot touch '/secrets/x': Read-only file system
$ docker run --volumes-from my-secret-container myimage
~~~
4. Drop capabilities
~~~bash
$ docker run --cap-drop SETUID --cap-drop SETGID myimage
$ docker run --cap-drop ALL --cap-add ...
~~~
5. Set CPUSHARES
~~~bash
$ docker run -d myimage
$ docker run -d -c 512 myimage
~~~
6. Set Memory limits
~~~bash
$ docker run -m 512m myimage
~~~
7. Defang setuid/setgid binaries

~~~ bash
// to find them
$ docker run debian \
   find / -perm +6000 -type f -exec ls -ld {} \; 2> dev/null

// to defang them
FROM debian:wheezy
RUN find / -perm +6000 -type f -exec chmod a-x {}; \; || true
~~~

Auditing (Immutable infrastructure, Audit images, not containers)
  
**tools:**
~~~bash
$ docker diff ...
$ scalock
$ twistlock
$ clair
~~~

Reference: <a href="https://www.youtube.com/watch?v=A32Yjizt2_s" target="_blank">https://www.youtube.com/watch?v=A32Yjizt2_s</a>
