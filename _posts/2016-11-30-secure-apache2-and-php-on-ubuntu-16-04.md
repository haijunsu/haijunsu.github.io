---
id: 266
title: Secure Apache2 and PHP on Ubuntu 16.04
date: 2016-11-30T15:25:53+00:00
author: Navy Su
layout: post
---
Create /etc/apache2/sites-available/000-security.conf

```bash
$ sudo vi /etc/apache2/sites-available/000-security.conf

# Secure apache website

# Disable Trace HTTP Request

TraceEnable off

# Disable Signature

ServerSignature Off

# Disable Banner

ServerTokens Prod

# If enabled ssl (sudo a2enmod ssl)

# Use only TLS, Disable SSLv2, SSLv3

# SSLProtocol -ALL +TLSv1

# Disable Null and Weak Ciphers

# SSLCipherSuite ALL:!aNULL:!ADH:!eNULL:!LOW:!EXP:RC4+RSA:+HIGH:+MEDIUM

# Disable Directory Listing

Options all -Indexes

# If enabled headers (sudo a2enmod headers)

# Disable x-powered by

Header always unset X-Powered-By
```

```bash
$ sudo a2ensite 000-security.conf
```

On ubuntu 16.04. The default php settings is good. Please make sure settings in php.ini

/etc/php/7.0/fpm/php.ini

/etc/php/7.0/apache2/php.ini

```bash
expose_php = Off

display_errors = Off
```

Reference: <a href="https://www.unixmen.com/ways-to-secure-your-ubuntu-14-04-server-running-lamp/" target="_blank">https://www.unixmen.com/ways-to-secure-your-ubuntu-14-04-server-running-lamp/</a>