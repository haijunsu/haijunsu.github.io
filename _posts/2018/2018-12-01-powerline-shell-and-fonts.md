---
title: Powerline Shell and Fonts
author: Haijun (Navy) Su
layout: post
tags: [linux, powerline, font]
---

## Install Powerline

Install pip `sudo apt-get install python-pip`
Install powerline `sudo pip install powerline-status`
Install fonts `sudo apt-get install fonts-powerline`

## Edit .bashrc

```shell
if [ -f `which powerline-daemon` ]; then
powerline-daemon -q
POWERLINE_BASH_CONTINUATION=1
POWERLINE_BASH_SELECT=1
fi
if [ -f /usr/local/lib/python2.7/dist-packages/powerline/bindings/bash/powerline.sh ]; then
source /usr/local/lib/python2.7/dist-packages/powerline/bindings/bash/powerline.sh
fi
```

## Using web font on chrome os.

Start Linux Shell window then press **Ctrl+Shift+J** and paste in the following:

```
term_.prefs_.set('font-family', '"Source Code Pro", monospace');
term_.prefs_.set('user-css', 'https://cdn.jsdelivr.net/gh/wernight/powerline-web-fonts@ba4426cb0c0b05eb6cb342c7719776a41e1f
```

References:

<https://github.com/wernight/powerline-web-fonts>

<https://gist.github.com/mrkara/68c6435f019136acd8db93546cff22e7>
