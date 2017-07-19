---
title: Italic fonts in iTerm2 tmux and vim
author: Haijun (Navy) Su
layout: post
tags: [vim,iterm2,linux,MacOS]
---
Run following command to fix italic fonts
~~~ bash
{ infocmp -1 xterm-256color ; echo -e "\tsitm=\\E[3m,\n\tritm=\\E[23m,"; } > xterm-256color.terminfo
tic xterm-256color.terminfo
rm xterm-256color.terminfo
~~~

To fix tmux, add following code in ~/.tmux.conf
~~~
set -g default-terminal "xterm-256color"
~~~

Reference: <https://alexpearce.me/2014/05/italics-in-iterm2-vim-tmux/>
