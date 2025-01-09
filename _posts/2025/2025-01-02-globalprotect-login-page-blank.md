---
title: GlobalProtect login page blank
author: Haijun (Navy) Su
layout: post
tags: [vpn,cuny, qc, globalprotect, global, protect]
---

The GlobalProtect login page is using the embedded browser by default. Sometimes it shows empty page and user cannot login. We can force the GlobalProtect to use default browser.

On Windows

```shell
# 32 bit Windows
msiexec.exe /i GlobalProtect.msi DEFAULTBROWSER=YES
# 64 bit Windows
msiexec.exe /i GlobalProtect64.msi DEFAULTBROWSER=YES
```

On MacOS

```shell
sudo defaults write /Library/Preferences/com.paloaltonetworks.GlobalProtect.settings.plist '{"Palo Alto Networks" ={GlobalProtect={Settings={default-browser=yes;};};};}'
```

References:

* <https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-user-authentication/set-up-external-authentication/set-up-saml-authentication/enable-the-default-browser-for-saml-authenitcation>
* <https://live.paloaltonetworks.com/t5/globalprotect-discussions/globalprotect-login-page-blank/td-p/501596>
