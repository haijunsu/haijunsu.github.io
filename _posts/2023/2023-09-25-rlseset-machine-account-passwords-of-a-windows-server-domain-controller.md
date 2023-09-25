---
title: Rseset Machine Account Passwords of a Windows Server Domain Controller
author: Haijun (Navy) Su
layout: post
tags: [Windows, Server, Domain]
---

## Symptoms

DCDIAG reports that the Active Directory replications test has failed and returned *error -2146893022: The target principal name is incorrect.*

Check the security issues:

```
PS C:\Windows\system32> dcdiag /test:checksecurityerror /replsource:server2.mydomain.com
...

Testing server: Default-First-Site-Name\server1
   Starting test: CheckSecurityError
      Source DC server2 was requested for a manual security error check.  Diagnosing...
               Authoritative attribute lastLogonTimestamp on server1 (writeable)
                  usnLocalChange = 57383
                  LastOriginatingDsa = server1
                  usnOriginatingChange = 57383
                  timeLastOriginatingChange = 2023-09-25 09:15:31
                  VersionLastOriginatingChange = 2
               Out-of-date attribute lastLogonTimestamp on server2 (writeable)
                  usnLocalChange = 8028
                  LastOriginatingDsa = server1
                  usnOriginatingChange = 24626
                  timeLastOriginatingChange = 2023-08-17 18:06:05
                  VersionLastOriginatingChange = 1
            Unable to verify the convergence of this machine account
            (CN=server2,OU=Domain Controllers,DC=mydomain,DC=com) on these DC's (server2,server1).  Does the machine
            account password need resetting? Are the SPN's in sync?

...

```

## Solution

* Reset the machine account password.

```bat
netdom resetpwd /s:server2 /ud:mydomain\administrator /pd:*  
```

* Force sync all

```bat
repadmin /syncall /AeD
repadmin /syncall /APeD

```

* Check DC status

```
dcdiag

```

References:

<https://learn.microsoft.com/en-us/troubleshoot/windows-server/identity/replication-error-2146893022>

<https://learn.microsoft.com/en-us/troubleshoot/windows-server/windows-security/use-netdom-reset-domain-controller-password>
