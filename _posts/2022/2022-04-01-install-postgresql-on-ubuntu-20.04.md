---
title: Install PostgreSQL on Ubuntu 20.04
author: Haijun (Navy) Su
layout: post
tags: [ubuntu, PostgreSQL]
---

* Install postgreSQL packages
```shell
sudo apt update
sudo apt install postgresql postgresql-contrib
```

* Start postgreSQL service

```shell
sudo systemctl start postgresql.service

```

* PostgreSql uses OS level to identify the `postgres` user (Ident Authentication). Using the following command to create normal user with login.

```shell
# sudo -i -u postgres
# psql
sudo -u postgres psql
postgres=# create user mypsqlAdmin with SUPERUSER CREATEDB CREATEROLE REPLICATION LOGIN PASSWORD 'password'; 
postgres=# create database mypsqlAdmin;
```

* Use `mypsqlAdmin` to logon 

**Note:** the postgreSQL server uses `peer` for local connection authentication. There is no user `mypsqlAdmin` on the os client. Run `psql` with `-h 127.0.0.1` option.

```shell
psql -U mysqlAdmin -W -h 127.0.0.1

```
