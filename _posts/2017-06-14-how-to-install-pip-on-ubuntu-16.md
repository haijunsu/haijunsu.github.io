---
title: How to install pip on Ubuntu 16
author: Haijun (Navy) Su
layout: post
tags: [python,python3,ubuntu,pip]
---
1. Upgrade packages to the latest version
~~~ bash
sudo apt-get update && sudo apt-get -y upgrade
~~~
2. Install python-pip
~~~ bash
sudo apt-get install python-pip
~~~
3. Check version
~~~ bash
pip -V
~~~

## Install pip3
~~~ bash
sudo get-apt install python3
sudo apt-get install python3-pip
python3 -m pip -V
~~~

## Upgrade pip3
~~~
sudo -H pip install --upgrade pip
~~~

## Others
* Searching a pacakage
~~~ bash
pip search package_name
~~~
* Installing a package
~~~ bash
pip install package_name
~~~
* uninstalling a package
~~~ bash
pip uninstall package_name
~~~

Source: <https://www.rosehosting.com/blog/how-to-install-pip-on-ubuntu-16-04/>
