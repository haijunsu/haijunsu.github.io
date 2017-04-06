---
id: 269
title: Install java on ubuntu
date: 2016-12-01T09:35:21+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=269
permalink: /2016/12/01/install-java-on-ubuntu/
categories:
  - develop tools
  - java
  - Ubuntu
tags:
  - java
---
Installing default jre/jdk

<pre class="prettyprint">sudo apt update
sudo apt install default-jre
sudo apt install default-jdk</pre>

Installing openjre/jdk 7<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo apt-get install openjdk-7-jre 
sudo apt-get install openjdk-7-jdk</pre>

Installing Oracle java<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo apt-get install python-software-properties
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update

sudo apt-get install oracle-java6-installer

sudo apt-get install oracle-java7-installer

sudo apt-get install oracle-java8-installer</pre>

Managing java

<pre class="prettyprint">sudo update-alternatives --config java
sudo update-alternatives --config javac</pre>

Setting JAVA_HOME

<pre class="prettyprint">sudo vi /etc/environment</pre>

<pre class="prettyprint">JAVA_HOME="YOUR_PATH"</pre>