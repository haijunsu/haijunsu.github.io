---
title: Postfix Monitor Sent Mails and Block Domains
author: Haijun (Navy) Su
layout: post
tags: [postfix, mail]
---

### Check how many mails has been sent via postfix.
If the number is to big, it must be hacked by someone on some services.
```shell
sudo grep "status=sent" /var/log/mail.log | egrep -ve 'postfix/(cleanup|pickup|master|qmgr|smtpd|local|pipe)' | wc -l
```

### Block email from domain
* Create access control file /etc/postfix/sender_access
```ini
domain1.com DISCARD
abusivecustomer.net DISCARD
example2.org REJECT
````
* Update configure file /etc/postfix/main.cf
```ini
smtpd_sender_restrictions = check_sender_access hash:/etc/postfix/sender_access
```
* Run postmap
```shell
postmap /etc/postfix/sender_access
```
* Restart postfix
```shell
service postfix restart
```
* Check the log /var/log/mail.log
```
May 29 14:46:30 mail-gateway postfix/smtpd[1435]: NOQUEUE: discard: RCPT from mail-cisdd[1.2.3.4]: <priyanka@dev-shoring.com>: Sender address triggers DISCARD action; from=<priyanka@dev-shoring.com> to=<user@mydomain.org> proto=ESMTP helo=<mydomain.org>
```


Reference:
<https://nacko.net/postfix-block-specific-from-specific-domains-centos-6-rhel-6/>
<https://superuser.com/questions/702897/monitor-postfix-outgoing-mail-delivery>

