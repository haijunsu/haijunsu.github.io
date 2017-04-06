---
id: 309
title: Bash git prompt
date: 2016-12-07T14:25:01+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=309
permalink: /2016/12/07/bash-git-prompt/
categories:
  - develop tools
  - git
tags:
  - develop
  - git
  - prompt
---
Change prompt when current folder is in git repository
  
Installation:<!--?prettify linenums=true?-->

<pre class="prettyprint">$ cd ~
$ git clone https://github.com/magicmonty/bash-git-prompt.git .bash-git-prompt --depth=1</pre>

Add to the ~/.bashrc

<pre class="prettyprint">$ vi ~/.bashrc
...
GIT_PROMPT_ONLY_IN_REPO=1
source ~/.bash-git-prompt/gitprompt.sh</pre>

Reference: <a href="https://github.com/magicmonty/bash-git-prompt" target="_blank">https://github.com/magicmonty/bash-git-prompt</a>