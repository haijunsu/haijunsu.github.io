---
title: Prevent users from shutting down Windows computer
author: Haijun (Navy) Su
layout: post
tags: [Windows]
---

<i class="fa fa-info-circle" aria-hidden="true"></i> Note:
User still can issue `shutdown` command to shutdown the computer
{: .note}

Reference:
<http://www.thewindowsclub.com/prevent-users-shutting-down-restarting-windows-computer>
<http://www.thewindowsclub.com/remove-shutdown-power-button-login-start-menu>

## Prevent access to shutdown, restart, sleep, hibernate commands
mmc --> File --> Add/Remove Snap-in --> Find Group Policy Object in the list on left and add it to right box

This will open the Group Policy Wizard.
Browse... --> Users tab --> Non-Administrators --> OK

In MMC console
Local Computer\Non-Administrators --> User Configuration --> Administrative Templates --> Start Menu and Taskbar

In the right pane, select *Remove and prevent access to the shutdown, restart, sleep, and hibernate commands* and double-click on it. Select *Enable* --> Apply/OK

## Remove Shutdown button from Login Screen
In the Registry Editor, use the left sidebar to navigate to the following key:
```
HKEY_LOCAL_MACHINE\ SOFTWARE\ Microsoft\ Windows\ CurrentVersion\ Policies\ System
```
In the list of items on the right, find this entry – *shutdownwithoutlogon* value and double-click it set the value to *0* in the “Value data” box and then click OK.
Exit Registry Editor and restart your computer to make the changes visible.

