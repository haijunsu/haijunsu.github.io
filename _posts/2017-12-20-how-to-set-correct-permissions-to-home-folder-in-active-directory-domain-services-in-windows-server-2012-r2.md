---
title: How to Set Correct Permissions to Home Folder in Active Directory Domain Services in Windows Server 2012 R2
author: Haijun (Navy) Su
layout: post
tags: [Windows, Permissions, home, folder]
---

Below are the user(s) with following permissions:

* Domain Users - Traverse folder, List Folder, Create Folders in 'This Folder Only'.
* Creator Owner - Full Control in Subfolders and file only.
* System - Full Control in This folder, subfolders and files.
* Domain Admins - Full Control in This folder, subfolders and files.

Reference:
<https://www.faqforge.com/windows-server-2012-r2/set-correct-permissions-home-folder-active-directory-domain-services-windows-server-2012-r2/>
