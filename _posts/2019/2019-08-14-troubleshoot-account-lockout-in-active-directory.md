---
title: Troubleshoot Account Lockout in Active Directory
author: Haijun (Navy) Su
layout: post
tags: [lock, account, windows, lockout]
---

**Problem**: A user complained that his account was lockouted frequencely. He changed password several days ago.

#### Common Causes 

* Mapped drives using old credentials
* Systems using old cached credentials
* Applications using old credentials
* Windows Services using expired credentials
* Schedule Tasks

#### Troubleshoot

* Use [Account Lockout and Management Tools](https://www.microsoft.com/en-us/download/details.aspx?id=18465) to check user status  (LockoutStatus.exe)
* Open Event Viewer to find Event ID 4740 to identify which station caused account lockouted.
* On workstation, find warning event to identify problem.

For my case, the *Credentials Manager* on workstation stored old password. After removed the stored credentials, problem is solved.

*Note:* each account has his own *Credentials Manager*

**Reference:**

<https://www.lepide.com/blog/what-are-the-common-root-causes-of-account-lockouts-and-do-i-resolve-them/>

<https://www.lepide.com/how-to/identify-the-source-of-account-lockouts-in-active-directory.html>

<https://expert-advice.org/active-directory/how-to-troubleshoot-account-lockout-in-active-directory/>
