---
id: 217
title: Postfix mail filtering on Ubuntu
date: 2016-11-19T01:22:49+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=217
permalink: /2016/11/19/postfix-mail-filtering-on-ubuntu/
categories:
  - Linux
  - Ubuntu
tags:
  - filter
  - filtering
  - linux
  - mail
  - message
  - postfix
  - ubuntu
---
Install postfix (config file is /etc/postfix/main.cf)

<pre class="prettyprint">$ sudo apt install postfix
$ sudo dpkg-reconfigure postfix
$ sudo postconf -e 'home_mailbox = Maildir/'
</pre>

Test mail

<pre class="prettyprint">$ telnet mail.yourdomain.com 25
ehlo yourdomain.com
mail from: root@yourdomain.com
rcpt to: fmaster@yourdomain.com
data
Subject: My first mail for my domain

Hi,
Are you there?
regards,
Admin
. (and Enter In a new Line)
quit
</pre>

Mail filtering

Check your fqdn name<!--?prettify linenums=true?-->

<pre class="prettyprint">$ hostname --fqdn</pre>

If it return localhost, change the first line in /etc/hosts.

<pre class="prettyprint">$ sudo vi /etc/hosts
127.0.0.1  servername.domain.com localhost</pre>

<pre class="prettyprint">$ sudo apt install amavisd-new spamassassin clamav-daemon
$ sudo apt install opendkim postfix-policyd-spf-python
$ sudo apt install pyzor razor
$ sudo apt install arj cabextract cpio nomarch pax rar unrar unzip zip jlha-utils lhasa
$ sudo adduser clamav amavis
$ sudo adduser amavis clamav
</pre>

<pre class="prettyprint">$ sudo vi /etc/default/spamassassin
...
ENABLED=1
...
</pre>

<pre class="prettyprint">$ sudo systemctl start spamassassin.service
use strict;

# You can modify this file to re-enable SPAM checking through spamassassin
# and to re-enable antivirus checking.

#
# Default antivirus checking mode
# Uncomment the two lines below to enable it
#

@bypass_virus_checks_maps = (
   \%bypass_virus_checks, \@bypass_virus_checks_acl, \$bypass_virus_checks_re);


#
# Default SPAM checking mode
# Uncomment the two lines below to enable it
#

@bypass_spam_checks_maps = (
   \%bypass_spam_checks, \@bypass_spam_checks_acl, \$bypass_spam_checks_re);

1;  # insure a defined return<!--?prettify linenums=true?--></pre>

<pre class="prettyprint">sudo vi /etc/amavis/conf.d/20-debian_defaults
...

$sa_spam_subject_tag = '***SPAM*** ';
# $sa_tag_level_deflt  = 2.0;  # add spam info headers if at, or above that level
# $sa_tag2_level_deflt = 6.31; # add 'spam detected' headers at that level
# $sa_kill_level_deflt = 6.31; # triggers spam evasive actions
# $sa_dsn_cutoff_level = 10;   # spam level beyond which a DSN is not sent
$sa_tag_level_deflt  = -999;  # add spam info headers if at, or above that level
$sa_tag2_level_deflt = 6.0; # add 'spam detected' headers at that level
$sa_kill_level_deflt = 21.0; # triggers spam evasive actions
$sa_dsn_cutoff_level = 4;   # spam level beyond which a DSN is not sent
...
# $final_spam_destiny       = D_BOUNCE;
$final_spam_destiny       = D_DISCARD;
...
</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo vi /etc/amavis/conf.d/50-user
...
@local_domains_acl = qw(.);
...</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo systemctl restart amavis.service</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo postconf -e 'content_filter = smtp-amavis:[127.0.0.1]:10024'</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo vi  /etc/postfix/master.cf
# add to the end of the file
smtp-amavis     unix    -       -       -       -       2       smtp
        -o smtp_data_done_timeout=1200
        -o smtp_send_xforward_command=yes
        -o disable_dns_lookups=yes
        -o max_use=20

127.0.0.1:10025 inet    n       -       -       -       -       smtpd
        -o content_filter=
        -o local_recipient_maps=
        -o relay_recipient_maps=
        -o smtpd_restriction_classes=
        -o smtpd_delay_reject=no
        -o smtpd_client_restrictions=permit_mynetworks,reject
        -o smtpd_helo_restrictions=
        -o smtpd_sender_restrictions=
        -o smtpd_recipient_restrictions=permit_mynetworks,reject
        -o smtpd_data_restrictions=reject_unauth_pipelining
        -o smtpd_end_of_data_restrictions=
        -o mynetworks=127.0.0.0/8
        -o smtpd_error_sleep_time=0
        -o smtpd_soft_error_limit=1001
        -o smtpd_hard_error_limit=1000
        -o smtpd_client_connection_count_limit=0
        -o smtpd_client_connection_rate_limit=0
        -o receive_override_options=no_header_body_checks,no_unknown_recipient_checks,no_milters</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">...
#628       inet  n       -       y       -       -       qmqpd
pickup    unix  n       -       y       60      1       pickup
   -o content_filter=
   -o receive_override_options=no_header_body_checks
cleanup   unix  n       -       y       -       0       cleanup
...
 39 #628       inet  n       -       y       -       -       qmqpd
 40 pickup    unix  n       -       y       60      1       pickup
 41    -o content_filter=
 42    -o receive_override_options=no_header_body_checks
 43 cleanup   unix  n       -       y       -       0       cleanup
...
</pre>

<!--?prettify linenums=true?-->

<pre class="prettyprint">sudo systemctl restart postfix.service
</pre>

Testing
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">$ telnet localhost 10024
Trying 127.0.0.1...
Connected to mail.cisdd.org.
Escape character is '^]'.
220 [127.0.0.1] ESMTP amavisd-new service ready
</pre>

Checked /var/log/mail.log and found errors
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">Nov 21 14:26:36 mail-tiqc amavis[705]: (00705-01) (!)run_av (ClamAV-clamd) FAILED - unexpected , output="/var/lib/amavis/tmp/amavis-20161121T142636-00705-g5ZqbF_3/parts: lstat() failed: Permission denied. ERROR\n"
Nov 21 14:26:36 mail-tiqc amavis[705]: (00705-01) (!)ClamAV-clamd av-scanner FAILED: CODE(0x4bde0d0) unexpected , output="/var/lib/amavis/tmp/amavis-20161121T142636-00705-g5ZqbF_3/parts: lstat() failed: Permission denied. ERROR\n" at (eval 100) line 905.
Nov 21 14:26:36 mail-tiqc amavis[705]: (00705-01) (!)WARN: all primary virus scanners failed, considering backups
</pre>

Fix error<!--?prettify linenums=true?-->

<pre class="prettyprint">$ sudo vi /etc/clamav/clamd.conf
...
AllowSupplementaryGroups true
...</pre>

<pre class="prettyprint">$ sudo systemctl restart clamav-daemon</pre>