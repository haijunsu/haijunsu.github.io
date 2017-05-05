---
title: Create web virtual host on windows 2012
author: Navy Su
layout: post
---
### SSL Certificate
If the website enabled ssl, the SSL certificate is required. Follow [Installing an SSL Certificate in Windows Server 2008 (IIS 7.0)
](https://www.sslshopper.com/article-installing-an-ssl-certificate-in-windows-server-2008-iis-7.0.html)

### Creating web virtual host
* Start IIS Manager: Start --> Control panel --> Administrative Tools --> Internet Information Services (IIS) Manager
![IIS manager shortcut]({{ site.baseurl }}/images/IIS-manager-shortcut.png)
* Select Sites and right click. 
![Add website link]({{ site.baseurl }}/images/IIS-add-website-link.png)
* Input website infomration
![Add http website]({{ site.baseurl }}/images/IIS-add-http-website.png)
* If SSL enabled, choose a SSL certificate for the website 
![Add https website]({{ site.baseurl }}/images/IIS-add-https-website.png)
* The website is ready.
![Add http website]({{ site.baseurl }}/images/IIS-add-http-website-done.png)

### Binding mutliple host names
* Select the virtual host and right click.
![Edit bindings link]({{ site.baseurl }}/images/IIS-edit-bindings.png)
* Click "Edit bindings..." to open Site bindings window 
![Site bindings gui]({{ site.baseurl }}/images/IIS-site-bindings-gui.png)
* Click add button to add a new host name
![Add Site binding gui]({{ site.baseurl }}/images/IIS-add-site-binding-gui.png)

