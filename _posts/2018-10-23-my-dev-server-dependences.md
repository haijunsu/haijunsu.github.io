---
title: My Dev Server Dependences
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, dev]
---
OS: Ubuntu 18.04 with xfce4 GUI
```shell
sudo apt update
sudo apt install build-essential

# jdk
sudo apt install default-jdk

# mariadb libs (mysql_config)
sudo apt install libmariadbclient-dev
# or
sudo apt-get install libmysqlclient-dev

# mariadb client
sudo apt install mariadb-client
# or mysql client
sudo apt install mysql-client

# mongodb client
sudo apt install mongodb-compass-community

# php
sudo apt install php php-dev

# nvm/nodejs
# https://github.com/creationix/nvm#install-script 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

# python libs
pip install --user -r requirment.txt
```

Content of requirement.txt
```
urllib3
mysqlclient
schedule
pytz
simple-date
certifi
openpyxl
beautifulsoup4
```


