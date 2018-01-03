---
title: Windows 7 Libraries Warning Message
author: Haijun (Navy) Su
layout: post
tags: [Windows]
---

## Error Messages
<i>some features are unavailable due to unsupported libraries locations. Click here to find more...</i>


## Rootcause
This would happen if following is true:
* A Library redirected to a network location
* Offline Files are not enabled for this Library on the client side.
* Windows Search is not running on the server side

## Solution
Edit group policy:
<b>
User Configuration > Policies > Administrative Templates > Windows Components > Windows Explorer > Turn off Windows Libraries features that rely on indexed file data
</b>
Set this policy to `Enabled`.

Reference:
<https://www.mysysadmintips.com/windows/active-directory/177-windows-7-libraries-some-features-are-unavailable-due-to-unsupported-libraries-locations-click-here-to-find-more>
