---
title: Delete Domain User From A Computer
author: Haijun (Navy) Su
layout: post
tags: [windows, user]
---

Open up "`Control Panel | System and Security | System`"
In the dialog click on "`Advanced system settings`" (requires Admin rights)
The "`System Properties`" dialog will be displayed
Make sure you are in the "`Advanced`" register
In the "`User Profiles`" section click on "Settings"
The "`User Profiles`" dialog is displayed
Select the account. Hit Delete.


Faster:

`Start | Run`
`sysdm.cpl`
switch to register "`Advanced`"
In the "`User Profiles`" section click on "`Settings`"
The "`User Profiles`" dialog is displayed
Select the account. Hit Delete.

You could always delete the `C:\Users\[ACCOUNT]` directory, but that leaves some registry entries behind that have to be manually deleted.


Deleting the Registy Keys

Open `Regedit` with Administrator Permissions (Runas Administrator)
Select the `HKEY_USERS` branch
Search for the Domain Account without the domain (e.g. login = DOMAIN\ACCOUNT then search for ACCOUNT)
Keep on searching until the status bar shows Computer `HKEY_USERS\[SID]\Software\Microsoft\Windwos\CurrentVersion\Explorer\Shell` Folders
There should be a large list of your ACCOUNTs folders e.g. `C:\Users\ACCOUNT\Desktop`
You are in the right `HKEY_USERS\[SID]\Software\Microsoft\Windwos\CurrentVersion\Explorer\Shell` Folders branch if the ACCOUNT in "`Shell Folders`" matches the ACCOUNT you just manually deleted form the `C:\Users\[ACCOUNT]` directory. This branch `[SID]` can be exported and/or deleted to clean up the last of the user profile.

Reference:
<https://serverfault.com/questions/450389/how-to-delete-domain-user-profile-from-a-computer>
