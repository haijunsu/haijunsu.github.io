---
id: 449
title: Magento database log cleaning
date: 2017-03-30T11:35:15+00:00
author: Navy Su
layout: post
---
Log tables:

~~~shell
log_customer

log_visitor

log_visitor_info

log_url

log_url_info

log_quote

report_viewed_product_index

report_compared_product_index

report_event

catalog_compare_item
~~~

**Cleaned by script:**

~~~shell
php -f shell/log.php clean
~~~

**Cleaned by Magento Admin (By default, it is disabled.):**

From the Magento Admin Panel, select **System** > **Configuration **
  
On the left, locate the Advanced menu and click **System**
  
From the System panel, click **Log**, and from the **Enable Log Cleaning** drop-down list, select **Yes**
  
In the **Save Log Days** field, enter 15 (The value is based on how much the traffics are)
  
Click **Save Config**

**Clean those tables manually with Mysql client or phpMyAdmin **(NOT recommend)

Source: <https://docs.nexcess.net/article/how-to-perform-magento-database-maintenance.html>