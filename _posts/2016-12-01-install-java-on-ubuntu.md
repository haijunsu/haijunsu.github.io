---
id: 269
title: Install java on ubuntu
date: 2016-12-01T09:35:21+00:00
author: Navy Su
layout: post
---
Installing default jre/jdk

~~~shell
sudo apt update

sudo apt install default-jre

sudo apt install default-jdk
~~~

Installing openjre/jdk 7

~~~shell
sudo apt-get install openjdk-7-jre 

sudo apt-get install openjdk-7-jdk
~~~

Installing Oracle java

~~~shell
sudo apt-get install python-software-properties

sudo add-apt-repository ppa:webupd8team/java

sudo apt-get update

sudo apt-get install oracle-java6-installer

sudo apt-get install oracle-java7-installer

sudo apt-get install oracle-java8-installer
~~~

Managing java

~~~shell
sudo update-alternatives --config java

sudo update-alternatives --config javac
~~~

Setting JAVA_HOME

~~~shell
sudo vi /etc/environment
~~~

~~~shell
JAVA_HOME="YOUR_PATH"
~~~