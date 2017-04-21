---
title: Using ssh command to enable proxy server on Linux machine
author: Navy Su
layout: post
---
The following command creates a proxy channel on linux server if logon success. The proxy server is localhost:1080.
```bash
ssh -D 1080 -C -N yourname@yourLinuxServer
```
