---
id: 285
title: Using pyenv on Ubuntu
date: 2016-12-01T16:07:12+00:00
author: Navy Su
layout: post
---
Installing pyenv

```bash
$ sudo apt-get install -y --fix-missing make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils

$ git clone https://github.com/yyuu/pyenv.git ~/.pyenv

$ git clone https://github.com/yyuu/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv

$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile

$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile

$ echo 'eval "$(pyenv init -)"' >> ~/.bash_profile

$ . ~/.bash_profile
```

Installing python

```bash
$ pyenv install 3.5.2
```

Setting python version

```bash
$ pyenv versions

$ pyenv global system

$ pyenv global 3.5.2

$ pyenv global

$ pyenv local

$ pyenv local 3.5.2
```

Using virtualenv

```bash
$ pyenv virtualenv 3.5.2 venv

$ pyenv activate venv

$ pyenv deactivate venv
```

Checking python version

```bash
$ python -V
```