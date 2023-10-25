---
title: Guacamole Upload Files Not Working
author: Haijun (Navy) Su
layout: post
tags: [guacamole, rdp]
---

In guacamole gcad image, the user is gcad. It cannot access the path such as `x:`. The drive path should be `/tmp/${GUAC_USERNAME}`. The shared folder is on the `gcad` docker container.

Steps:

* Connections
* Edit Connection
* Device Redirection Options chosen: 
  * Enable drive: 'checked'
  * Drive path: "/tmp/${GUAC_USERNAME}"
  * Automatically create drive - 'checked'

Reference:

<https://serverfault.com/questions/1022519/guacamole-rdp-file-transfer-error>
