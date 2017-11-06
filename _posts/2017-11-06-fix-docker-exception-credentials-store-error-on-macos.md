---
title: Fix Docker Exception - Credentials store error on MacOS
author: Haijun (Navy) Su
layout: post
tags: [macos, osx, docker, credentions, error]
---
When I run docker-compose command on Mac OS, I hit an error as below:
```
docker.errors.DockerException: Credentials store error: StoreError('Credentials store docker-credential-osxkeychain exited with "User interaction is not allowed.".',)
Failed to execute script docker-compose
```

### Solution
Logout docker
```
docker logout
```
That's it. Problem solved.
