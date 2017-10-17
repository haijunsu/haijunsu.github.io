---
title: Linux YUM Commands for Package Mangement
author: Haijun (Navy) Su
layout: post
tags: [CentOS, Linux, yum]
---
YUM: *Yellowdog Updater Modified*
* Install a package with YUM:
```bash
sudo yum install <package name>
sudo yum -y install <package name>
```

* Removing a package with YUM:
```bash
sudo yum remove <package name>
sudo yum -y remove <package name>
```

* Updating a package using YUM
```bash
sudo yum update [package name]
```
<i class="fa fa-info-circle" aria-hidden="true"></i> Note: it will update all packages without package name.

* Search for a package using YUM
```bash
sudo yum search <package name>
```

* Get information of a package using YUM
```bash
sudo yum info <package name>
```

* List all available packages in the YUM database using YUM
```bash
sudo yum list | less
```

* List all installed packages using YUM
```bash
sudo yum list installed | less
```

* List a package using YUM
```bash
sudo yum list [package name]
```

* Yum provides function
Used to find which package a specific file belongs to. For example, the following command shows the package that has /etc/my.cnf.

```bash
$ sudo yum provides /etc/my.cnf
Loaded plugins: fastestmirror
Loading mirror speeds from cached hostfile
 * base: mirror.linux.duke.edu
 * epel: mirror.cc.columbia.edu
 * extras: mirror.cc.columbia.edu
 * updates: mirror.steadfast.net
MariaDB-common-10.1.28-1.el7.centos.x86_64 : MariaDB: a very fast and robust SQL database server
Repo        : mariadb
Matched from:
Filename    : /etc/my.cnf



1:mariadb-libs-5.5.56-2.el7.i686 : The shared libraries required for MariaDB/MySQL clients
Repo        : base
Matched from:
Filename    : /etc/my.cnf



1:mariadb-libs-5.5.56-2.el7.x86_64 : The shared libraries required for MariaDB/MySQL clients
Repo        : base
Matched from:
Filename    : /etc/my.cnf



MariaDB-common-10.1.28-1.el7.centos.x86_64 : MariaDB: a very fast and robust SQL database server
Repo        : @mariadb
Matched from:
Filename    : /etc/my.cnf
```

* Check for available updates using YUM
```bash
sudo yum check-update
```

* Update System using YUM
```bash
sudo yum update
```

* List all available group packages
```bash
sudo yum grouplist
```

* Install a group packages
```bash
sudo yum groupinstall <group name>
```

* Update a group packages
```bash
sudo yum groupupdate <group name>
```

* Remove a group packages
```bash
sudo yum groupremove
```

* List enable YUM repositories on the system
```bash
sudo yum repolist
```

* List all enabled and disabled YUM repositories on the system
```bash
sudo yum repolist all
```

* Install a package from a specific repository
```bash
sudo yum --enablerepo=epel install <package name>
```

* Interactive YUM shell

```bash
$ sudo yum shell
Loaded plugins: fastestmirror
> check-update
Loading mirror speeds from cached hostfile
 * base: mirror.linux.duke.edu
 * epel: mirror.cc.columbia.edu
 * extras: mirror.cc.columbia.edu
 * updates: mirror.steadfast.net
```

* Clean YUM cache
```bash
sudo yum clean all
```

* Vies history of YUM
```bash
sudo yum history
```

Reference: <https://www.tecmint.com/20-linux-yum-yellowdog-updater-modified-commands-for-package-mangement/>
