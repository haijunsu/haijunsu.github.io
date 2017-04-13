---
id: 422
title: Rename a computer name in a domain and run into exists error
date: 2017-03-15T13:56:51+00:00
author: Navy Su
layout: post
---
Rename a computer name as old computer name in a domain. There is an error &#8220;The account already exists&#8221;. Check the following records to make sure there is no record of the old computer name.

  * Active Directory Users and Computers
  * DNS
  * ADSI Edit

Disjoin domain doesn&#8217;t remove the computer account. You need remove it manually.