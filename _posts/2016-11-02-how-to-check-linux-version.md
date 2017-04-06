---
id: 63
title: How to check linux version
date: 2016-11-02T23:53:44+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=63
permalink: /2016/11/02/how-to-check-linux-version/
categories:
  - Linux
tags:
  - cli
  - linux
  - version
---
  1. <span style="font-weight: 400;"><span style="font-weight: 400;">uname &#8211; Print kernel and system information.<!--?prettify linenums=true?--></span></span> 
    
    <pre class="prettyprint">uname -a</pre>

  2.  <span style="font-weight: 400;">lsb_release &#8211; Print distribution-specific information.<!--?prettify linenums=true?--></span> 
    
    <pre class="prettyprint">lsb_release -a</pre>

  3. <span style="font-weight: 400;"><span style="font-weight: 400;"> /proc/version file &#8211; Print running kernel information.<!--?prettify linenums=true?--></span></span> 
    
    <pre class="prettyprint">more /proc/version</pre>