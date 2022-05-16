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

* Enable listen all ips

```shell
cd /etc/postgresql/12/main/conf.d/
vi mypostgresql.conf

```
Put the following content in the file

```
listen_addresses = '*' 
```

Edit host-based authentication file

```shell
cd /etc/postgresql/12/main/
vi pg_hba.conf
```

Add the following content in the IPv4 block

```
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
host    all             all             0.0.0.0/0               md5

```

* Re-start postgreSQL service

```shell
sudo systemctl restart postgresql.service

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

## Install PostGIS extension

<https://postgis.net/docs/postgis_installation.html>

* Install GCC, Anacoda3, proj, and GEOS

```shell
sudo add-apt-repository ppa:ubuntugis/ppa
sudo apt update
sudo apt install build-essential
sudo apt install libgeos++-dev libgeos-3.8.0 libgeos-c1v5 libgeos-dev libgeos-doc
sudo apt-get install -y libxml2-dev
sudo apt install libjson-c-dev
sudo apt-get install gdal-bin
sudo apt install libpq-dev
sudo apt install postgresql-server-dev-12
wget https://repo.anaconda.com/archive/Anaconda3-2020.02-Linux-x86_64.sh
bash Anaconda3-2020.02-Linux-x86_64.sh
conda install proj
```

* Compile PostGIS and install

```
wget http://postgis.net/stuff/postgis-3.2.2.tar.gz
tar -zxf postgis-3.2.2.tar.gz
cd postgis-3.2.2
./configure --with-projdir=/root/anaconda3/pkgs/proj-6.2.1-haa6030c_0 --without-protobuf --without-raster
make clean
make
export PGUSER=postgres #overwrite psql variables
make check #to test before install
make test
make install
# to test extensions
make check RUNTESTFLAGS=--extension
```

* Verify that the extensions are installed

```sql

SELECT name, default_version,installed_version
FROM pg_available_extensions WHERE name LIKE 'postgis%' or name LIKE 'address%';

             name             | default_version | installed_version
------------------------------+-----------------+-------------------
 address_standardizer         | 3.2.2dev         | 3.2.2dev
 address_standardizer_data_us | 3.2.2dev         | 3.2.2dev
 postgis                      | 3.2.2dev         | 3.2.2dev
 postgis_raster               | 3.2.2dev         | 3.2.2dev
 postgis_sfcgal               | 3.2.2dev         |
 postgis_tiger_geocoder       | 3.2.2dev         | 3.2.2dev
 postgis_topology             | 3.2.2dev         |
(6 rows)

```

* Install postgis extension in a database

```sql
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_raster;
CREATE EXTENSION postgis_sfcgal;
CREATE EXTENSION fuzzystrmatch; --needed for postgis_tiger_geocoder
--optional used by postgis_tiger_geocoder, or can be used standalone
CREATE EXTENSION address_standardizer;
CREATE EXTENSION address_standardizer_data_us;
CREATE EXTENSION postgis_tiger_geocoder;
CREATE EXTENSION postgis_topology;

```

* Check the extensions version

```psql
\connect mygisdb
\x
\dx postgis*
```

```
List of installed extensions
-[ RECORD 1 ]-------------------------------------------------
Name        | postgis
Version     | 3.2.2dev
Schema      | public
Description | PostGIS geometry, geography, and raster spat..
-[ RECORD 2 ]-------------------------------------------------
Name        | postgis_raster
Version     | 3.0.0dev
Schema      | public
Description | PostGIS raster types and functions
-[ RECORD 3 ]-------------------------------------------------
Name        | postgis_tiger_geocoder
Version     | 3.2.2dev
Schema      | tiger
Description | PostGIS tiger geocoder and reverse geocoder
-[ RECORD 4 ]-------------------------------------------------
Name        | postgis_topology
Version     | 3.2.2dev
Schema      | topology
Description | PostGIS topology spatial types and functions
```
