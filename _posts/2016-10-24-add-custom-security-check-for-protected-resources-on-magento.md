---
id: 7
title: Add custom security check for protected resources on Magento
date: 2016-10-24T15:30:47+00:00
author: Navy Su
layout: post
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
---
Assume catalog needs be protected for register customer and there is an url &#8216;/secure/url&#8217; which need be protected too.

  1. Modify templete &#8216;page/html/head.phtml&#8217; and add following code
  
     
    
```bash
<?php

    //check security contents

    echo $this->getLayout()->createBlock('core/template')->setTemplate('page/html/security.phtml')->toHtml();

?>
```

  2. Create a new file &#8216;page/html/security.phtml&#8217; with the following contents
  
     
    
```bash
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
```

Get request information for test purpose:
  

```bash
<?php

    echo Mage::app()->getRequest()->getModuleName();

    echo "<br />";

    echo Mage::app()->getRequest()->getControllerName();

    echo "<br />";

    echo Mage::app()->getRequest()->getActionName();

    echo "<br />";

    echo Mage::app()->getRequest()->getRequestUri();

    echo "<br />";

?>

```

reference:

<http://stackoverflow.com/questions/16691546/want-to-call-one-phtml-file-in-another-phtml-file-using-anchor-tag>

<http://stackoverflow.com/questions/8235282/magento-display-request-url>

