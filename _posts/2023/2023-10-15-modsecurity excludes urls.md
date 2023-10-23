---
title: ModSecurity excludes urls
author: Haijun (Navy) Su
layout: post
tags: [apache, security, mod security]
---

In the virtual host configuration file, add the following code.

```
   SecRuleEngine DetectionOnly
   SecRule REQUEST_BASENAME "@beginsWith /excludeUrls" "id:1,ctl:ruleEngine=Off"

```
