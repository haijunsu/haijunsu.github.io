---
title: Kill process via CLI on Windows
author: Haijun (Navy) Su
layout: post
---
### Two commands can be used
* tasklist -- check process name and id
* taskkill -- kill process

**Example**
Kill process by application name
~~~
Taskkill /F /IM i_view32.exe
~~~
Kill process by PID
~~~
Taskkill /PID 1032 /F
~~~

Source: [Kill Process From the Command Prompt In Windows 8](http://www.c-sharpcorner.com/UploadFile/8ea152/kill-process-from-the-command-prompt-in-windows-8/)


