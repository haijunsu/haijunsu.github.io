---
id: 329
title: 'Mac OSX &#8220;Hold for authentication&#8221; when trying to print'
date: 2017-01-04T13:53:07+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=329
permalink: /2017/01/04/mac-osx-hold-for-authentication-when-trying-to-print/
categories:
  - Mac
tags:
  - authentication
  - osx
  - print
---
Fix steps:

  1. Print any document and the job is hold in queue with message &#8220;Hold for authentication&#8221;
  2. Open a terminal window and run the following commands<!--?prettify linenums=true?-->
    
    <pre class="prettyprint">$ lpstat -s
</pre>
    
    Output likes the following:
  
    device for <printer name>: smb://<server>/<shared name>
    
    <pre class="prettyprint">device for Canon_iR_ADV_4245: smb://my-windows-printer-server/Canon_iR_ADV_4245
</pre>
    
    <pre class="prettyprint">$ sudo lpadmin -p &lt;printer name&gt; -o auth-info-required=&lt;Your username&gt;,&lt;Your password&gt;
</pre>

Reference: <a href="http://servalpaul.blogspot.com/2015/01/mac-osx-hold-for-authentication-when.html" target="_blank">http://servalpaul.blogspot.com/2015/01/mac-osx-hold-for-authentication-when.html</a>