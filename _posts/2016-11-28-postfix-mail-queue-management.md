---
id: 250
title: Postfix Mail Queue Management
date: 2016-11-28T14:40:50+00:00
author: Navy Su
layout: post
---
View mail queue

~~~bash
sudo mailq
~~~

Flush mail queue method1

~~~bash
sudo postfix flush
~~~

Flush mail queue method2

~~~bash
sudo postfix -f
~~~

Remove all mails in the deferred queue

~~~bash
sudo postsuper -d ALL deferred
~~~

Remove all mails from queue

~~~bash
sudo postsuper -d ALL
~~~

Reference: https://www.cyberciti.biz/tips/howto-postfix-flush-mail-queue.html