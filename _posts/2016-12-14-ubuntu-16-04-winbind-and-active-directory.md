---
id: 326
title: Ubuntu 16.04 Winbind and Active Directory
date: 2016-12-14T15:21:22+00:00
author: Navy Su
layout: post
---
<a href="https://help.ubuntu.com/lts/serverguide/sssd-ad.html" target="_blank">Official SSSD and Active Directory guide</a> doesn&#8217;t work. It is hard to find what&#8217;s wrong. Using <a href="https://help.ubuntu.com/community/ActiveDirectoryWinbindHowto" target="_blank">Winbind</a> works well.

Installation:

```bash
sudo apt install winbind samba

sudo apt install cups-common python-crypto-dbg python-crypto-doc bind9 bind9utils ctdb ldb-tools ntp smbldap-tools heimdal-clients libnss-winbind libpam-winbind
```

Configuration:

```bash
sudo vi /etc/samba/smb.conf
```

```bash
[global]

## Browsing/Identification ###

# Change this to the workgroup/NT-domain name your Samba server will part of

#   workgroup = GROUP

# server string is the equivalent of the NT Description field

  server string = %h server (Samba, Ubuntu)

        security = ads

        realm = MYDOMAIN.COM

# If the system doesn't find the domain controller automatically, you may need the following line

#        password server = 10.0.0.1

# note that workgroup is the 'short' domain name

        workgroup = MYDOMAIN

#       winbind separator = +

        idmap uid = 10000-20000

        idmap gid = 10000-20000

        winbind enum users = yes

        winbind enum groups = yes

        template homedir = /home/%D/%U

        template shell = /bin/bash

        client use spnego = yes

        client ntlmv2 auth = yes

        encrypt passwords = yes

        winbind use default domain = yes

        restrict anonymous = 2
```

Restart services:

```bash
sudo service winbind stop

sudo service samba-ad-dc restart

sudo service winbind start
```

Join the AD (see &#8220;net ads help&#8221;):

```bash
sudo kinit Admin@MYDOMAIN.COM

# check klist

sudo klist

# join (ignore the dns error messages)

sudo net ads join -k

OR

sudo net ads join -U Admin@MYDOMAIN.COM
```

Setup Authentication
  

```bash
sudo vi /etc/nsswitch.conf

```

```bash
passwd:         compat winbind

group:          compat winbind

shadow:         compat

```

Restart Winbind

```bash
sudo service winbind restart

```

PAM Configuration
  

```bash
sudo pam-auth-update

```

Create Home directory
  

```bash
sudo mkdir /home/MYDOMAIN

```

Add sudo users
  

```bash
sudo vi /etc/sudoers.d/MYDOMAIN

```

```bash
# replace adgroup as real domain group name

%adgroup        ALL=(ALL) NOPASSWD: ALL

```

Test
  

```bash
wbinfo -u

wbinfo -g

```

Login as a domain user and enjoy&#8230;