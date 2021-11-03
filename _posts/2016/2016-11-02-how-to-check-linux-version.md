---
id: 63
title: How to check linux version
date: 2016-11-02T23:53:44+00:00
author: Navy Su
layout: post
---
  1. <span style="font-weight: 400;"><span style="font-weight: 400;">uname &#8211; Print kernel and system information.</span></span> 
    
~~~shell
uname -a
~~~

  2.  <span style="font-weight: 400;">lsb_release &#8211; Print distribution-specific information.</span> 
    
~~~shell
lsb_release -a
~~~

  3. <span style="font-weight: 400;"><span style="font-weight: 400;"> /proc/version file &#8211; Print running kernel information.</span></span> 
    
~~~shell
more /proc/version
~~~