---
id: 326
title: Ubuntu 16.04 Winbind and Active Directory
date: 2016-12-14T15:21:22+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=326
permalink: /2016/12/14/ubuntu-16-04-winbind-and-active-directory/
categories:
  - Ubuntu
  - Windows 2012
tags:
  - Active
  - Directory
  - ubuntu
  - Winbind
  - windows
---
<a href="https://help.ubuntu.com/lts/serverguide/sssd-ad.html" target="_blank">Official SSSD and Active Directory guide</a> doesn&#8217;t work. It is hard to find what&#8217;s wrong. Using <a href="https://help.ubuntu.com/community/ActiveDirectoryWinbindHowto" target="_blank">Winbind</a> works well.

Installation:<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo apt install winbind samba
sudo apt install cups-common python-crypto-dbg python-crypto-doc bind9 bind9utils ctdb ldb-tools ntp smbldap-tools heimdal-clients libnss-winbind libpam-winbind</pre>

Configuration:

<pre class="prettyprint">sudo vi /etc/samba/smb.conf</pre>

<pre class="prettyprint">[global]

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
        restrict anonymous = 2</pre>

Restart services:

<pre class="prettyprint">sudo service winbind stop
sudo service samba-ad-dc restart
sudo service winbind start</pre>

Join the AD (see &#8220;net ads help&#8221;):<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo kinit Admin@MYDOMAIN.COM
# check klist
sudo klist
# join (ignore the dns error messages)
sudo net ads join -k

OR
sudo net ads join -U Admin@MYDOMAIN.COM</pre>

Setup Authentication
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo vi /etc/nsswitch.conf
</pre>

&nbsp;

<pre class="prettyprint">passwd:         compat winbind
group:          compat winbind
shadow:         compat
</pre>

Restart Winbind<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo service winbind restart
</pre>

PAM Configuration
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo pam-auth-update
</pre>

Create Home directory
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo mkdir /home/MYDOMAIN
</pre>

Add sudo users
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo vi /etc/sudoers.d/MYDOMAIN
</pre>

&nbsp;

<pre class="prettyprint"># replace adgroup as real domain group name
%adgroup        ALL=(ALL) NOPASSWD: ALL
</pre>

Test
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">wbinfo -u
wbinfo -g
</pre>

Login as a domain user and enjoy&#8230;