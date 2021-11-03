---
title: Do not display last username on logon screen in Windows
author: Haijun (Navy) Su
layout: post
tags: [windows, logon]
---

### Using Group Policy

Type `secpol.msc` in Windows Start Search and hit Enter. This will open the Local Security Policy Editor. Navigate to Security Settings > Local Policies > Security Options.
Now on the right-hand side, look for *Interactive Logon: Do not display last username*. Right click on it and open its Properties. Set it to Enabled > Apply.

### Using Registry Editor

```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"dontdisplaylastusername"=dword:00000001

```

Reference: <http://www.thewindowsclub.com/make-windows-7-8-use-classic-logon-screen>
