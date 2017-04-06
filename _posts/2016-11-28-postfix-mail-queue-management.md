---
id: 250
title: Postfix Mail Queue Management
date: 2016-11-28T14:40:50+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=250
permalink: /2016/11/28/postfix-mail-queue-management/
categories:
  - Linux
  - postfix
  - Ubuntu
tags:
  - defer
  - linux
  - mail
  - postfix
  - queue
  - ubuntu
---
View mail queue

<pre class="prettyprint">sudo mailq</pre>

Flush mail queue method1<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo postfix flush</pre>

Flush mail queue method2

<pre class="prettyprint">sudo postfix -f</pre>

Remove all mails in the deferred queue

<pre class="prettyprint">sudo postsuper -d ALL deferred</pre>

Remove all mails from queue

<pre class="prettyprint">sudo postsuper -d ALL</pre>

Reference: https://www.cyberciti.biz/tips/howto-postfix-flush-mail-queue.html