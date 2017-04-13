---
id: 269
title: Install java on ubuntu
date: 2016-12-01T09:35:21+00:00
author: Navy Su
layout: post
---
Installing default jre/jdk

```bash
sudo apt update

sudo apt install default-jre

sudo apt install default-jdk
```

Installing openjre/jdk 7

```bash
sudo apt-get install openjdk-7-jre 

sudo apt-get install openjdk-7-jdk
```

Installing Oracle java

```bash
sudo apt-get install python-software-properties

sudo add-apt-repository ppa:webupd8team/java

sudo apt-get update

sudo apt-get install oracle-java6-installer

sudo apt-get install oracle-java7-installer

sudo apt-get install oracle-java8-installer
```

Managing java

```bash
sudo update-alternatives --config java

sudo update-alternatives --config javac
```

Setting JAVA_HOME

```bash
sudo vi /etc/environment
```

```bash
JAVA_HOME="YOUR_PATH"
```