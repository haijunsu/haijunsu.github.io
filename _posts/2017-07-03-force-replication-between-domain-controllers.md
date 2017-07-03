---
title: Force Replication Between Domain Controllers
author: Haijun (Navy) Su
layout: post
tags: [Windows]
---

1. Open Active Directory Sites and Services: On the **Start** menu, point to **Administrative Tools**, and then click **Active Directory Sites and Services**.
2. In the console tree, expand **Sites**, and then expand the site to which you want to force replication from the updated server.
3. Expand the **Servers** container to display the list of servers that are currently configured for that site.
4. Expand the server objects and click their **NTDS Settings** objects to display their connection objects in the details pane. Find a server that has a connection object from the server on which you made the updates.
5. Click **NTDS Settings** below the server object. In the details pane, right-click the connection object whose **From Server** is the domain controller that has the updates that you want to replicate, and then click **Replicate Now**.
6. When the **Replicate Now** message box appears, review the information, and then click **OK**.

## Synchronize Replication with All Partners
* At a command prompt, type the following command, and then press ENTER:
~~~
repadmin /syncall <DomainControllerName> /e /d /A /P /q
~~~

Value | Description
--- | ---
repadmin /syncall | Synchronizes a specified domain controller with all replication partners.
&lt;DomainControllerName&gt; | The Domain Name System (DNS) name of the domain controller on which you want to synchronize replication with all partners.
/e | Enterprise; includes partners in all sites.
/d | Identifies servers by their distinguished names in messages.
/A | All; synchronizes all directory partitions that are held on the home server.
/P | Pushes changes outward from the home server.
/q | Runs in quiet mode; suppresses callback messages.

* Check for replication errors in the output of the command in the previous step. If there are no errors, replication is successful. For replication to complete, any errors must be corrected.

Refer: 
<https://technet.microsoft.com/en-us/library/cc816926(v=ws.10).aspx>

<https://technet.microsoft.com/en-us/library/cc816915(v=ws.10).aspx#Anchor_0>
