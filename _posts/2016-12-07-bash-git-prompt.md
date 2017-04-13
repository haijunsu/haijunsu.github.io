---
id: 309
title: Bash git prompt
date: 2016-12-07T14:25:01+00:00
author: Navy Su
layout: post
---
Change prompt when current folder is in git repository
  
Installation:

```bash
$ cd ~

$ git clone https://github.com/magicmonty/bash-git-prompt.git .bash-git-prompt --depth=1
```

Add to the ~/.bashrc

```bash
$ vi ~/.bashrc

...

GIT_PROMPT_ONLY_IN_REPO=1

source ~/.bash-git-prompt/gitprompt.sh
```

Reference: <a href="https://github.com/magicmonty/bash-git-prompt" target="_blank">https://github.com/magicmonty/bash-git-prompt</a>