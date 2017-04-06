---
id: 285
title: Using pyenv on Ubuntu
date: 2016-12-01T16:07:12+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=285
permalink: /2016/12/01/using-pyenv-on-ubuntu/
categories:
  - python
tags:
  - pyenv
  - python
  - virutalenv
---
Installing pyenv

<pre class="prettyprint">$ sudo apt-get install -y --fix-missing make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils
$ git clone https://github.com/yyuu/pyenv.git ~/.pyenv
$ git clone https://github.com/yyuu/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' &gt;&gt; ~/.bash_profile
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' &gt;&gt; ~/.bash_profile
$ echo 'eval "$(pyenv init -)"' &gt;&gt; ~/.bash_profile
$ . ~/.bash_profile</pre>

Installing python

<pre class="prettyprint">$ pyenv install 3.5.2</pre>

Setting python version

<pre class="prettyprint">$ pyenv versions
$ pyenv global system
$ pyenv global 3.5.2
$ pyenv global
$ pyenv local
$ pyenv local 3.5.2</pre>

Using virtualenv<!--?prettify linenums=true?-->

<pre class="prettyprint">$ pyenv virtualenv 3.5.2 venv
$ pyenv activate venv
$ pyenv deactivate venv</pre>

Checking python version

<pre class="prettyprint">$ python -V</pre>