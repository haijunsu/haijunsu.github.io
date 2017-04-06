---
id: 427
title: How to block IPs on Windows Server 2012
date: 2017-03-24T11:02:36+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=427
permalink: /2017/03/24/how-to-block-ips-on-windows-server-2012/
categories:
  - Windows
  - Windows 2012
tags:
  - block ip
  - firewall
  - ip
  - windows
---
Open Windows Firewall with Advanced Security

Click Inbound Rules

Click New Rule&#8230;

Chose Custom

<img class="alignnone wp-image-428 size-full" src="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-01.png?fit=724%2C586" srcset="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-01.png?w=724 724w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-01.png?resize=300%2C243 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

Choose default values on Program and &#8220;Protocol and Ports&#8221; windows.

<img class="alignnone size-full wp-image-429" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-02.png?fit=725%2C583" alt="" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-02.png?w=725 725w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-02.png?resize=300%2C241 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-430" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-03.png?fit=721%2C584" alt="" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-03.png?w=721 721w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/03/fw-03.png?resize=300%2C243 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

Choose default on Profile

Give a name of this rule and Finish