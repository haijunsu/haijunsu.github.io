---
title: mysql_config missed
author: Haijun (Navy) Su
layout: post
tags: [mysql, mysqlclient]
---
Error:
```shell
Collecting mysqlclient==1.3.9 (from -r requirements.txt (line 3))
  Using cached https://files.pythonhosted.org/packages/db/f5/c8e1657985c31dda16e434edf5257c31572fa5faacd7e48b1618390e4b18/mysqlclient-
1.3.9.tar.gz
    Complete output from command python setup.py egg_info:
    /bin/sh: 1: mysql_config: not found
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
      File "/tmp/pip-build-eis8fsc3/mysqlclient/setup.py", line 17, in <module>
        metadata, options = get_config()
      File "/tmp/pip-build-eis8fsc3/mysqlclient/setup_posix.py", line 44, in get_config
        libs = mysql_config("libs_r")
      File "/tmp/pip-build-eis8fsc3/mysqlclient/setup_posix.py", line 26, in mysql_config
        raise EnvironmentError("%s not found" % (mysql_config.path,))
    OSError: mysql_config not found
```

Solution:
```shell
#mysql
sudo apt-get install libmysqlclient-dev

# mariadb
sudo apt-get install libmariadbclient-dev
```

Reference: <https://stackoverflow.com/questions/7475223/mysql-config-not-found-when-installing-mysqldb-python-interface>
