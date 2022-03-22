---
title: Make a Andorid PAd/Phone Running Linux
author: Haijun (Navy) Su
layout: post
tags: [linux, android, termux]
---

- Download the `Termux` from this page [Termux](https://f-droid.org/en/packages/com.termux/). Please scroll down to download the `APK` file instead of the `F-Droid` button.

- Run the following command to install zash and fonts

```shell
pkg install root-repo x11-repo
apt update
apt upgrade
pkg install python3 git openssh vim zsh

# oh-my-zsh
chsh zsh
sh -c "$(curl -fsSL https://github.com/Cabbagec/termux-ohmyzsh/raw/master/install.sh)"

# powerlevel10k theme
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc

# SpaceVim
curl -sLf https://spacevim.org/install.sh | bash
```

- Access SDCARD and storage

```
/mnt/sdcard/
```

shared storage in `$(HOME)/storage`.

see detail at <https://wiki.termux.com/wiki/Internal_and_external_storage>