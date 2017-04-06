---
id: 454
title: Web-Based Guacamole tool
date: 2017-03-31T11:03:33+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=454
permalink: /2017/03/31/web-based-guacamole-tool/
categories:
  - develop tools
  - Linux
  - Windows
tags:
  - guacamole
  - guacd
  - linux
  - remote
  - windows
---
Guacamole website: <https://guacamole.incubator.apache.org/>

Create database for Guacamole: (DB name is **guacamole_db**)

<pre class="prettyprint">$ mysql -u root -p

mysql&gt; create database <strong>guacamole_db</strong>;
mysql&gt; grant all privileges on <strong>guacamole_db</strong>.* to guacamole_user@localhost identified by 'secure password';
mysql&gt; flush  privileges;</pre>

Initializing the MySQL database

<pre class="prettyprint">$ docker run --rm guacamole/guacamole /opt/guacamole/bin/initdb.sh --mysql &gt; initdb.sql

$ mysql -u guacamole_user -p <strong>guacamole_db</strong> &lt; initdb.sql</pre>

Create my-guacd docker container

<pre class="prettyprint">$ docker run --name my-guacd -d guacamole/guacd</pre>

Create my-guacamole docker container

<pre class="prettyprint">docker run --name my-guacamole \
  --link my-guacd:guacd \
  -e MYSQL_HOSTNAME=${DB_HOST} \
  -e MYSQL_PORT=${DB_PORT} \
  -e MYSQL_DATABASE=${DB_NAME} \
  -e MYSQL_USER=${DB_USER} \
  -e MYSQL_PASSWORD=${DB_PASS} \
  -d -p 8080:8080 guacamole/guacamole</pre>

Test:

<pre class="prettyprint">http://&lt;server ip&gt;:8080/guacamole/</pre>

Logs:

<pre class="prettyprint">$ docker logs my-guacamole</pre>

Behind apache proxy:

<pre class="prettyprint">&lt;Location /guacamole/&gt;
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
</pre>