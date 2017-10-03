---
title: Move Wordpress to new server with new domain
author: Haijun (Navy) Su
layout: post
tags: [wordpress]
---
1. Backup all file system
2. Backup database
3. Replace old domain to new domain in backup database file
4. If the home directory is different on new server, we need to replace the home directory value in database file as well. Also we need to use grep to find hardcode in backup files and fix it.

Note: We still loss our theme customize data. We need to keep the old website to help setting the new one.
