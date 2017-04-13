---
id: 466
title: Git tagging
date: 2017-04-03T14:41:18+00:00
author: Navy Su
layout: post
---
List available tags:

```bash
$ git tag

$ git tag -l &lt;tag name&gt;
```

Creating tags:

```bash
$ git tag -a &lt;tag name&gt; -m &lt;comment&gt;
```

Show tag data:

```bash
$ git show &lt;tab name&gt;
```

Sharing Tags:
  


```bash
$ git push origin &lt;tag name&gt;

$ git push origin --tags  // share all tags
```

Checking out tags:

```bash
$ git checkout -b &lt;branchname&gt; &lt;tag name&gt;
```