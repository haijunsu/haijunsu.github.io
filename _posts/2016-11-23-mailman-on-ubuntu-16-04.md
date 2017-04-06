---
id: 238
title: Mailman on ubuntu 16.04
date: 2016-11-23T13:42:55+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=238
permalink: /2016/11/23/mailman-on-ubuntu-16-04/
categories:
  - Linux
  - Ubuntu
tags:
  - mailman
  - ubuntu
---
Install apache2

<pre class="prettyprint">sudo apt install apache2</pre>

Install postfix

<pre class="prettyprint">sudo apt install postfix</pre>

Install mailman

<pre class="prettyprint">sudo apt install mailman</pre>

Setup apache

<pre class="prettyprint">sudo cp /etc/mailman/apache.conf /etc/apache2/sites-available/mailman.conf
sudo a2ensite mailman.conf
sudo a2enmod cgi
sudo a2enmod cgid
sudo service apache2 restart</pre>

Activate the MTA option on the mailman config file (<tt>/etc/mailman/mm_cfg.py</tt>). Write or uncomment this line: <!--?prettify linenums=true?-->

<pre class="prettyprint">MTA = 'Postfix'</pre>

Run the script to generate aliases.

<pre class="prettyprint">sudo /usr/lib/mailman/bin/genaliases</pre>

Use the **postconf** command to add the necessary configuration to <tt>/etc/postfix/main.cf</tt>:

<pre class="prettyprint">sudo postconf -e 'relay_domains = lists.example.com'
sudo postconf -e 'transport_maps = hash:/etc/postfix/transport'
sudo postconf -e 'mailman_destination_recipient_limit = 1'
sudo postconf -e 'alias_maps = hash:/etc/aliases, hash:/var/lib/mailman/data/aliases'</pre>

In <tt>/etc/postfix/master.cf</tt> double check that you have the following transport:

<pre class="prettyprint">mailman   unix  -       n       n       -       -       pipe
  flags=FR user=list argv=/usr/lib/mailman/bin/postfix-to-mailman.py
  ${nexthop} ${user}</pre>

Edit the file <tt>/etc/postfix/transport</tt>:

<pre class="prettyprint">lists.example.com      mailman:</pre>

Now have Postfix build the **transport** map

<pre class="prettyprint">sudo postmap -v /etc/postfix/transport</pre>

Then add mailman aliases in /etc/aliases

<pre class="prettyprint">mailman:              "|/var/lib/mailman/mail/mailman post mailman"
mailman-admin:        "|/var/lib/mailman/mail/mailman admin mailman"
mailman-bounces:      "|/var/lib/mailman/mail/mailman bounces mailman"
mailman-confirm:      "|/var/lib/mailman/mail/mailman confirm mailman"
mailman-join:         "|/var/lib/mailman/mail/mailman join mailman"
mailman-leave:        "|/var/lib/mailman/mail/mailman leave mailman"
mailman-owner:        "|/var/lib/mailman/mail/mailman owner mailman"
mailman-request:      "|/var/lib/mailman/mail/mailman request mailman"
mailman-subscribe:    "|/var/lib/mailman/mail/mailman subscribe mailman"
mailman-unsubscribe:  "|/var/lib/mailman/mail/mailman unsubscribe mailman"</pre>

Fix permissions of aliases files and restart postfix

<pre class="prettyprint">sudo chown root:list /var/lib/mailman/data/aliases
sudo chown root:list /etc/aliases
sudo newaliases
sudo /etc/init.d/postfix restart
</pre>

Create mailman list

<pre class="prettyprint">$ sudo newlist mailman mailmanadm@mydomain.com
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

  Hit enter to notify mailman owner...</pre>

Edit /etc/aliases and run<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo newaliases</pre>

Start mailman

<pre class="prettyprint">$ sudo /etc/init.d/mailman start</pre>

Start mailman qrunner

<pre class="prettyprint">$ sudo /var/lib/mailman/bin/mailmanctl start</pre>

Add members to list

<pre class="prettyprint">$ vi ~/members
user1@mydomain.com
user2@mydomain.com

$ sudo /var/lib/mailman/bin/add_members -r ~/members -w y -a y mailman</pre>

Mailmain script location<!--?prettify linenums=true?-->

<pre class="prettyprint">/var/lib/mailman/bin</pre>

Change site password

<pre class="prettyprint">sudo ./mmsitepass</pre>

Change list passoword

<pre class="prettyprint">sudo ./change_pw -l &lt;list name&gt; -p &lt;new password&gt;</pre>

Discard pending post

<pre class="prettyprint">sudo ./discard /var/lib/mailman/data/heldmsg-&lt;list name&gt;-&lt;msg number&gt;.pck</pre>

Reference: <a href="https://help.ubuntu.com/community/Mailman" target="_blank"> https://help.ubuntu.com/community/Mailman</a>