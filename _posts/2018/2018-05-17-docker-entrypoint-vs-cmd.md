---
title: Docker ENTRYPOINT vs CMD
author: Haijun (Navy) Su
layout: post
tags: [docker]
---

Both ENTRYPOINT and CMD can identify which executable should be run when a container is started from image.

### Overrides
* Use `hostname` command to Override CMD
```shell
docker run -it ubuntu hostname
```

* Use `hostname` command to Override ENTRIPOINT
```shell
docker run --entrypoint hostname ubuntu
```

### Shell Form VS Exec Form
* Shell form is using `/bin/sh -c`
* Exec form execute the command directly

Example:
```
CMD ping localhost
```
The command will be `/bin/sh -c 'ping localhost'` in docker container. It may cause problem.

Exec form provide command in braces.
Example:
```
CMD ["/bin/ping", "localhost"]
```
The command will be `/bin/ping localhost` in docker container. We should use this way.

### ENTRYPOINT and CMD Together
When using ENTRYPOINT and CMD together it's important that you *always* use the exec form of both instructions.

Example
```shell
Dockerfile    Command
ENTRYPOINT /bin/ping -c 3
CMD localhost    /bin/sh -c '/bin/ping -c 3' /bin/sh -c localhost
ENTRYPOINT ["/bin/ping","-c","3"]
CMD localhost    /bin/ping -c 3 /bin/sh -c localhost
ENTRYPOINT /bin/ping -c 3
CMD ["localhost"]"    /bin/sh -c '/bin/ping -c 3' localhost
ENTRYPOINT ["/bin/ping","-c","3"]
CMD ["localhost"]    /bin/ping -c 3 localhost
```


Reference: <https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/>
