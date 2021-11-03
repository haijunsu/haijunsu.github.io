---
id: 238
title: Mailman on ubuntu 16.04
date: 2016-11-23T13:42:55+00:00
author: Navy Su
layout: post
---
Install apache2

~~~shell
sudo apt install apache2
~~~

Install postfix

~~~shell
sudo apt install postfix
~~~

Install mailman

~~~shell
sudo apt install mailman
~~~

Setup apache

~~~shell
sudo cp /etc/mailman/apache.conf /etc/apache2/sites-available/mailman.conf

sudo a2ensite mailman.conf

sudo a2enmod cgi

sudo a2enmod cgid

sudo service apache2 restart
~~~

Activate the MTA option on the mailman config file (<tt>/etc/mailman/mm_cfg.py</tt>). Write or uncomment this line: 

~~~shell
MTA = 'Postfix'
~~~

Run the script to generate aliases.

~~~shell
sudo /usr/lib/mailman/bin/genaliases
~~~

Use the **postconf** command to add the necessary configuration to <tt>/etc/postfix/main.cf</tt>:

~~~shell
sudo postconf -e 'relay_domains = lists.example.com'

sudo postconf -e 'transport_maps = hash:/etc/postfix/transport'

sudo postconf -e 'mailman_destination_recipient_limit = 1'

sudo postconf -e 'alias_maps = hash:/etc/aliases, hash:/var/lib/mailman/data/aliases'
~~~

In <tt>/etc/postfix/master.cf</tt> double check that you have the following transport:

~~~shell
mailman   unix  -       n       n       -       -       pipe

  flags=FR user=list argv=/usr/lib/mailman/bin/postfix-to-mailman.py

  ${nexthop} ${user}
~~~

Edit the file <tt>/etc/postfix/transport</tt>:

~~~shell
lists.example.com      mailman:
~~~

Now have Postfix build the **transport** map

~~~shell
sudo postmap -v /etc/postfix/transport
~~~

Then add mailman aliases in /etc/aliases

~~~shell
mailman:              "|/var/lib/mailman/mail/mailman post mailman"

mailman-admin:        "|/var/lib/mailman/mail/mailman admin mailman"

mailman-bounces:      "|/var/lib/mailman/mail/mailman bounces mailman"

mailman-confirm:      "|/var/lib/mailman/mail/mailman confirm mailman"

mailman-join:         "|/var/lib/mailman/mail/mailman join mailman"

mailman-leave:        "|/var/lib/mailman/mail/mailman leave mailman"

mailman-owner:        "|/var/lib/mailman/mail/mailman owner mailman"

mailman-request:      "|/var/lib/mailman/mail/mailman request mailman"

mailman-subscribe:    "|/var/lib/mailman/mail/mailman subscribe mailman"

mailman-unsubscribe:  "|/var/lib/mailman/mail/mailman unsubscribe mailman"
~~~

Fix permissions of aliases files and restart postfix

~~~shell
sudo chown root:list /var/lib/mailman/data/aliases

sudo chown root:list /etc/aliases

sudo newaliases

sudo /etc/init.d/postfix restart

~~~

Create mailman list

~~~shell
$ sudo newlist mailman mailmanadm@mydomain.com

  Enter the email of the person running the list: bhuvaneswaran at NOSPAM gmail.com

  Initial mailman password:

  To finish creating your mailing list, you must edit your /etc/aliases (orequivalent) file by adding the following lines, and possibly running the `newaliases' program:

  ## mailman mailing list

  mailman:              "|/var/lib/mailman/mail/mailman post mailman"

  mailman-admin:        "|/var/lib/mailman/mail/mailman admin mailman"

  mailman-bounces:      "|/var/lib/mailman/mail/mailman bounces mailman"

  mailman-confirm:      "|/var/lib/mailman/mail/mailman confirm mailman"

  mailman-join:         "|/var/lib/mailman/mail/mailman join mailman"

  mailman-leave:        "|/var/lib/mailman/mail/mailman leave mailman"

  mailman-owner:        "|/var/lib/mailman/mail/mailman owner mailman"

  mailman-request:      "|/var/lib/mailman/mail/mailman request mailman"

  mailman-subscribe:    "|/var/lib/mailman/mail/mailman subscribe mailman"

  mailman-unsubscribe:  "|/var/lib/mailman/mail/mailman unsubscribe mailman"

  Hit enter to notify mailman owner...
~~~

Edit /etc/aliases and run

~~~shell
$ sudo newaliases
~~~

Start mailman

~~~shell
$ sudo /etc/init.d/mailman start
~~~

Start mailman qrunner

~~~shell
$ sudo /var/lib/mailman/bin/mailmanctl start
~~~

Add members to list

~~~shell
$ vi ~/members

user1@mydomain.com

user2@mydomain.com

$ sudo /var/lib/mailman/bin/add_members -r ~/members -w y -a y mailman
~~~

Mailmain script location

~~~shell
/var/lib/mailman/bin
~~~

Change site password

~~~shell
sudo ./mmsitepass
~~~

Change list passoword

~~~shell
sudo ./change_pw -l <list name> -p <new password>
~~~

Discard pending post

~~~shell
sudo ./discard /var/lib/mailman/data/heldmsg-<list name>-<msg number>.pck
~~~

Reference: <a href="https://help.ubuntu.com/community/Mailman" target="_blank"> https://help.ubuntu.com/community/Mailman</a>