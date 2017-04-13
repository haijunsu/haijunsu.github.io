---
id: 454
title: Web-Based Guacamole tool
date: 2017-03-31T11:03:33+00:00
author: Navy Su
layout: post
---
Guacamole website: <https://guacamole.incubator.apache.org/>

Create database for Guacamole: (DB name is **guacamole_db**)

```bash
$ mysql -u root -p



mysql&gt; create database <strong>guacamole_db</strong>;

mysql&gt; grant all privileges on <strong>guacamole_db</strong>.* to guacamole_user@localhost identified by 'secure password';

mysql&gt; flush  privileges;
```

Initializing the MySQL database

```bash
$ docker run --rm guacamole/guacamole /opt/guacamole/bin/initdb.sh --mysql &gt; initdb.sql



$ mysql -u guacamole_user -p <strong>guacamole_db</strong> &lt; initdb.sql
```

Create my-guacd docker container

```bash
$ docker run --name my-guacd -d guacamole/guacd
```

Create my-guacamole docker container

```bash
docker run --name my-guacamole \

  --link my-guacd:guacd \

  -e MYSQL_HOSTNAME=${DB_HOST} \

  -e MYSQL_PORT=${DB_PORT} \

  -e MYSQL_DATABASE=${DB_NAME} \

  -e MYSQL_USER=${DB_USER} \

  -e MYSQL_PASSWORD=${DB_PASS} \

  -d -p 8080:8080 guacamole/guacamole
```

Test:

```bash
http://&lt;server ip&gt;:8080/guacamole/
```

Logs:

```bash
$ docker logs my-guacamole
```

Behind apache proxy:

```bash
&lt;Location /guacamole/&gt;

    Order allow,deny

    Allow from all

    ProxyPass http://HOSTNAME:8080/guacamole/ flushpackets=on

    ProxyPassReverse http://HOSTNAME:8080/guacamole/

&lt;/Location&gt;



&lt;Location /guacamole/websocket-tunnel&gt;

    Order allow,deny

    Allow from all

    ProxyPass ws://HOSTNAME:8080/guacamole/websocket-tunnel

    ProxyPassReverse ws://HOSTNAME:8080/guacamole/websocket-tunnel

&lt;/Location&gt;


```