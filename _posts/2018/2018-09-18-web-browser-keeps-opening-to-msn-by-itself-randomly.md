---
title: Web browser keeps opening to MSN by itself randomly
author: Haijun (Navy) Su
layout: post
tags: [windows, browser]
---

I have an issue on a Windows 10 computer. It keeps opening MSN webpage by itself randomly. Googled it and found a lot of people have the same issue. I also find the answer at <https://answers.microsoft.com/en-us/windows/forum/windows_10-other_settings/web-browser-keeps-opening-to-msn-by-itself/192def23-0180-4812-bcea-654c502c9928>. It is on page 5 and answered by stitches12. Thanks.

Solution:
1. Open Command prompt or Powershell window with administrator right.
2. Run the following command.
```
reg add "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NlaSvc\Parameters\Internet" /v EnableActiveProbing /t REG_DWORD /d 0 /f
```
