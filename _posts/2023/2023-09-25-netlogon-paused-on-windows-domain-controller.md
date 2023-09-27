---
title: Netlogon Paused on Windows Domain Controller
author: Haijun (Navy) Su
layout: post
tags: [Windows, Server, Domain, Cotroller]
---

## Rootcause

* Restoring AD database using snapshot.
* Abnormal restart of the DC which corrupts AD database called **NTDS,DIT**.
* **Rubuilding Indices** occurs when a domain controller is restored from the snapshot or rebooted abnormally.


## Solution

The better way to to handle this kind of issue is to demote the DC and promote the DC again.

Here is another simple way:

* Open Regedit
* Navigate to *HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\NTDS\Parameters*
* Locate the key: *Dsa Not Writable=dword:00000004*
* Delete the key
* Enable replaction by running the below commands if the repoication is disabled.

```

repadmin /options myserver -DISABLE_INBOUND_REPL
repadmin /options myserver -DISABLE_OUTBOUND_REPL

```

* Reboot

References:

<https://awinish.wordpress.com/tag/netlogon-paused/#:~:text=The%20error%20%E2%80%9CNetlogon%20Paused%E2%80%9D%20occurs,the%20snapshot%20or%20rebooted%20abnormally%20.>

