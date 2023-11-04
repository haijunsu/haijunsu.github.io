---
title: Securing Apache2 With ModSecurity on Ubuntu
author: Haijun (Navy) Su
layout: post
tags: [modsecurity, apache, secure, ubuntu]
---

## Install ModSecurity

```shell
sudo apt install libapache2-mod-security2 -y
sudo a2mod headers
sudo systemctl restart apache2
```

## Configuring ModSecurity

* Use the recommended extension

```shell
sudo cp /etc/modsecurity/modsecurity.conf-recommended /etc/modsecurity/modsecurity.conf
```

* Modify the configuration file `/etc/modsecurity/modsecurity.conf`

```conf
# File: /etc/modsecurity/modsecurity.conf
# – Rule engine initialization ———————————————-
# Enable ModSecurity, attaching it to every transaction. Use detection
# only to start with, because that minimises the chances of post-installation
# disruption.
SecRuleEngine On 
…

```

* Restart Apache to apply changes

```shell
sudo systemctl restart apache2
```

## Setting up the OWASP ModSecurity Core Rule Set

[OWASP ModSecurity Core Rule Set (CRS)](https://github.com/coreruleset/coreruleset)

* Delete the current rule set that comes prepackaged with ModSecurity

```shell
sudo rm -rf /usr/share/modsecurity-crs
```

* Clone the OWASP-CRS github repository into the `/usr/share/modsecurity-crs` directory

```shell
sudo git clone https://github.com/coreruleset/coreruleset /usr/share/modsecurity-crs
```

* Using sample configuration

```shell
sudo mv /usr/share/modsecurity-crs/crs-setup.conf.example /usr/share/modsecurity-crs/crs-setup.conf
sudo mv /usr/share/modsecurity-crs/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf.example /usr/share/modsecurity-crs/rules/REQUEST-900-EXCLUSION-RULES-BEFORE-CRS.conf
```

* Modify the `/etc/apache2/mods-available/security2.conf` file to include the OWASP-CRS files

```conf
# File: /etc/apache2/mods-available/security2.conf
SecDataDir /var/cache/modsecurity 
Include /usr/share/modsecurity-crs/crs-setup.conf 
Include /usr/share/modsecurity-crs/rules/*.conf
```

* Edit the `VirtualHost` conf file or block the set the `SecRuleEngine on`.

```conf
# File: /etc/apache2/sites-enabled/example.com.conf
<VirtualHost *:80> 
    ServerAdmin webmaster@localhost 
    DocumentRoot /var/www/html

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    SecRuleEngine On
    ...
</VirtualHost>
```

* Restart Apache2

```shell
sudo systemctl restart apache2
```

## Verifying ModSecurity

Test ModSecurity by performing a simple local file inclusion attack by running the following command

```shell
curl http://<SERVER-IP/DOMAIN>/index.html?exec=/bin/bash
```

If ModSecurity has been configured correctly and is actively blocking attacks, the following error is returned

```html
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html>
  <head>
   <title>403 Forbidden</title>
  </head>
  <body>
    <h1>Forbidden</h1>
    <p>You don't have permission to access this resource.</p>
    <hr>
    <address>Apache/2.4.41 (Ubuntu) Server at 172.105.53.220 Port 80</address>
  </body>
</html>

```



Reference:

<https://www.linode.com/docs/guides/securing-apache2-with-modsecurity/>
