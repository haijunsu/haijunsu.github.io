---
id: 7
title: Add custom security check for protected resources on Magento
date: 2016-10-24T15:30:47+00:00
author: Navy Su
layout: post
guid: http://navysu.x10host.com/?p=7
permalink: /2016/10/24/add-custom-security-check-for-protected-resources-on-magento/
code:
  - |
    <?php
    // check security content
    if (("catalog" === Mage::app()->getRequest()->getModuleName()) || (0 === strpos(Mage::app()->getRequest()->getRequestUri(), '/secure/url'))) {
    if (!($this->helper('customer')->isLoggedIn())){
    ?>
    <script type="text/javascript">
    window.location.href = "<?php echo $this->getUrl('customer/account/login')?>";
    </script>
    <?php
    die();
    }
    }
    ?>
categories:
  - Magento
  - security
tags:
  - Magento
  - protected
  - secure
  - security
---
Assume catalog needs be protected for register customer and there is an url &#8216;/secure/url&#8217; which need be protected too.

  1. Modify templete &#8216;page/html/head.phtml&#8217; and add following code
  
    <!--?prettify linenums=true?--></p> 
    
    <pre class="prettyprint">&lt;?php
    //check security contents
    echo $this-&gt;getLayout()-&gt;createBlock('core/template')-&gt;setTemplate('page/html/security.phtml')-&gt;toHtml();
?&gt;</pre>

  2. Create a new file &#8216;page/html/security.phtml&#8217; with the following contents
  
    <!--?prettify linenums=true?--></p> 
    
    <pre class="prettyprint">&lt;?php
    // check security content
    if (("catalog" === Mage::app()-&gt;getRequest()-&gt;getModuleName()) || (0 === strpos(Mage::app()-&gt;getRequest()-&gt;getRequestUri(), '/secure/url'))) {
        if (!($this-&gt;helper('customer')-&gt;isLoggedIn())){
?&gt;
            &lt;script type="text/javascript"&gt;
                  window.location.href = "&lt;?php echo $this-&gt;getUrl('customer/account/login')?&gt;";
            &lt;/script&gt;
&lt;?php
            die();
        }
    }
?&gt;</pre>

Get request information for test purpose:
  
<!--?prettify linenums=true?-->

<pre class="prettyprint">&lt;?php
    echo Mage::app()-&gt;getRequest()-&gt;getModuleName();
    echo "&lt;br /&gt;";
    echo Mage::app()-&gt;getRequest()-&gt;getControllerName();
    echo "&lt;br /&gt;";
    echo Mage::app()-&gt;getRequest()-&gt;getActionName();
    echo "&lt;br /&gt;";
    echo Mage::app()-&gt;getRequest()-&gt;getRequestUri();
    echo "&lt;br /&gt;";
?&gt;
</pre>

reference:

<http://stackoverflow.com/questions/16691546/want-to-call-one-phtml-file-in-another-phtml-file-using-anchor-tag>

<http://stackoverflow.com/questions/8235282/magento-display-request-url>

&nbsp;