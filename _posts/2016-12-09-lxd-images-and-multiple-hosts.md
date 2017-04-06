---
id: 315
title: LXD images and multiple hosts
date: 2016-12-09T16:23:17+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=315
permalink: /2016/12/09/lxd-images-and-multiple-hosts/
categories:
  - Linux
  - LXD
  - Ubuntu
tags:
  - image
  - lxd
  - remote
  - ubuntu
---
Remote operations require the following two commands having been run on the remote server:<!--?prettify linenums=true?-->

<pre class="prettyprint">lxc config set core.https_address "[::]:8443"
lxc config set core.trust_password some-password</pre>

Add a remote server:<!--?prettify linenums=true?-->

<pre class="prettyprint">lxc remote add &lt;server alias&gt; &lt;ip address or DNS&gt;</pre>

And after that, use all the same command as above but prefixing the container and images name with the remote host like:
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">lxc exec host-a:first -- apt-get update</pre>

Manually import images example:<!--?prettify linenums=true?-->

<pre class="prettyprint">lxc image copy images:gentoo/current/amd64 local: --alias gentoo --auto-update
lxc image import &lt;tarball&gt; --alias random-image
lxc image import https://dl.stgraber.org/lxd --alias busybox-amd64</pre>

List images:

<pre class="prettyprint">lxc image list
lxc image list &lt;remote server alias&gt;:</pre>

Editing image:

<pre class="prettyprint">lxc image edit &lt;alias or fingerprint&gt;</pre>

Deleting image:

<pre class="prettyprint">lxc image delete &lt;alias or fingerprint&gt;</pre>

Create you own image from a container:

<pre class="prettyprint">lxc publish my-container/some-snapshot --alias some-image</pre>

&nbsp;

&nbsp;

Reference:
  
<a href="https://linuxcontainers.org/lxd/getting-started-cli/" target="_blank">Installing LXD and the command line tool</a>
  
<a href="https://www.stgraber.org/2016/03/30/lxd-2-0-image-management-512/" target="_blank">LXD 2.0: Image management [5/12]</a>