---
id: 48
title: 'Check Mysql user&#8217;s privileges'
date: 2016-11-02T22:55:41+00:00
author: Navy Su
layout: post
---
Show root user&#8217;s privileges:

```bash
mysql> SHOW GRANTS FOR 'root'@'localhost';

+---------------------------------------------------------------------+

| Grants for root@localhost                                           |

+---------------------------------------------------------------------+

| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |

+---------------------------------------------------------------------+
```

Show current user&#8217;s privileges:
  

```bash
mysql> show grants;

+---------------------------------------------------------------------+

| Grants for root@localhost                                           |

+---------------------------------------------------------------------+

| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |

| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION        |

+---------------------------------------------------------------------+

2 rows in set (0.00 sec)

mysql> show grants for current_user;

+---------------------------------------------------------------------+

| Grants for root@localhost                                           |

+---------------------------------------------------------------------+

| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |

| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION        |

+---------------------------------------------------------------------+

2 rows in set (0.00 sec)

mysql> show grants for current_user();

+---------------------------------------------------------------------+

| Grants for root@localhost                                           |

+---------------------------------------------------------------------+

| GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION |

| GRANT PROXY ON ''@'' TO 'root'@'localhost' WITH GRANT OPTION        |

+---------------------------------------------------------------------+

2 rows in set (0.00 sec)

```