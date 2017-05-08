---
id: 329
title: 'Mac OSX &#8220;Hold for authentication&#8221; when trying to print'
date: 2017-01-04T13:53:07+00:00
author: Navy Su
layout: post
---
Fix steps:

  1. Print any document and the job is hold in queue with message &#8220;Hold for authentication&#8221;
  2. Open a terminal window and run the following commands
    
~~~bash
$ lpstat -s

~~~
    
    Output likes the following:
  
    device for <printer name>: smb://<server>/<shared name>
    
~~~bash
device for Canon_iR_ADV_4245: smb://my-windows-printer-server/Canon_iR_ADV_4245

~~~
    
~~~bash
$ sudo lpadmin -p <printer name> -o auth-info-required=<Your username>,<Your password>

~~~

Reference: <a href="http://servalpaul.blogspot.com/2015/01/mac-osx-hold-for-authentication-when.html" target="_blank">http://servalpaul.blogspot.com/2015/01/mac-osx-hold-for-authentication-when.html</a>