---
title: Sync a fork of a repository to keep it up-to-date with the upstream repository
author: Haijun (Navy) Su
layout: post
tags: [git, fork]
---

* Configuring a remote for a fork

``` bash
$ git remote -v
$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
$ git remote -v
```

* Sync a fork

``` bash
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
$ git push -u origin master
```

* Reference

<https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork>

<https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork>
