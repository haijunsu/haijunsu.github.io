---
title: List MAC accounts in the terminal
author: Haijun (Navy) Su
layout: post
tags: [MAC,OSX,User]
---
To list accounts, run following commands.
~~~ bash
dscacheutil -q user | grep -A 3 -B 2 -e uid:\ 5'[0-9][0-9]'
dscl . list /Users | grep -v ^_.*
~~~

Reference: <https://apple.stackexchange.com/questions/29874/how-can-i-list-all-user-accounts-in-the-terminal>
