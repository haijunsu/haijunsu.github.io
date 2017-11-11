---
id: 466
title: Git tagging
date: 2017-04-03T14:41:18+00:00
author: Navy Su
layout: post
---
List available tags:

~~~shell
$ git tag

$ git tag -l <tag name>
~~~

Creating tags:

~~~shell
$ git tag -a <tag name> -m <comment>
~~~

Show tag data:

~~~shell
$ git show <tab name>
~~~

Sharing Tags:
  

~~~shell
$ git push origin <tag name>

$ git push origin --tags  // share all tags
~~~

Checking out tags:

~~~shell
$ git checkout -b <branchname> <tag name>
~~~