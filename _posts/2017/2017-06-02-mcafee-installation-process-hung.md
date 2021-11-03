---
title: McAfee Installation Process Hung
author: Haijun (Navy) Su
layout: post
---
When I installed McAfee Antivirus Enterprise v8.8 on a Windows 8.1, it was hung. Checked the log @ c:\users\$user\AppData\Local\Temp\McAfeeLogs and found a messge "Waiting on McShield to report RUNNING or STOPPED (current state 2)" in installation log. 

### Workaround
<https://kc.mcafee.com/corporate/index?page=content&id=KB83642&snspd-0115>
Create the **Start** DWORD value for each of the required McAfee processes:

<font style="color: #C72541; background: #F9F2F4;">CAUTION: </font>This article contains information about opening or modifying the registry.
* The following information is intended for System Administrators. Registry modifications are irreversible and could cause system failure if done incorrectly.
* Before proceeding, Technical Support strongly recommends backing up your registry and understanding the restore process. For more information, see: <http://support.microsoft.com/kb/256986>
* Do not run a .REG file that is not confirmed to be a genuine registry import file.

1. Press Windows+R, type **regedit**, and click OK.
2. Navigate to the following registry key:
  ~~~
  HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\
  ~~~
3. For each of the following sub keys, verify the Start value exists within the key, and contains the data shown:
  * McShield
  ~~~
      Start=2
  ~~~
  * mfevtp
  ~~~
      Start=2
  ~~~
  * mfehidk
  ~~~
      Start=0
  ~~~
4. If there is no **Start** value, right-click a blank space, select **New**, **DWORD value**, and name it **Start**.
5. Right-click the new **Start** value, select **Modify**, and ensure that the **Value data** is set to the appropriate number shown in step 3.
6. Restart the system
