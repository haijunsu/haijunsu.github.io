---
id: 342
title: Upgrading SYSVOL replication to DFSR
date: 2017-01-12T15:39:03+00:00
author: Navy Su
layout: post
---
<span style="font-weight: 400;">Server manager → Tools → Active directory Domains and Trusts</span>

<span style="font-weight: 400;">Click right button on Root (Active Directory Domains and Trusts [win2012 server name]) → Raise Domain Functional Level … → Windows Server 2012 R2</span>

<img class="alignnone size-full" src="https://i2.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs1.png?resize=739%2C197" data-recalc-dims="1" />

<img class="alignnone size-full" src="https://i1.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs2.png?resize=685%2C267" data-recalc-dims="1" />

<span style="font-weight: 400;">Type dfsrmig /getmigrationstate to confirm all domain controllers have reached prepared state</span>

<img class="alignnone size-full" src="https://i1.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs3.png?resize=624%2C96" data-recalc-dims="1" />

<img src="https://i0.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs4.png?w=840" data-recalc-dims="1" />

<span style="font-weight: 400;">Type dfsrmig /getmigrationstate to confirm all domain controllers have reached redirected state</span>

<img src="https://i1.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs5.png?w=840" data-recalc-dims="1" />

<img class="alignnone size-full" src="https://i1.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs6.png?resize=690%2C239" data-recalc-dims="1" />

<span style="font-weight: 400;">Type dfsrmig /getmigrationstate to confirm all domain controllers have reached eliminated state</span>

<img src="https://i2.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs7.png?w=840" data-recalc-dims="1" />

<span style="font-weight: 400;">Check net share status</span>

<img src="https://i0.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs8.png?w=840" data-recalc-dims="1" />

<span style="font-weight: 400;">Also make sure in each domain controller FRS service is stopped and disabled</span>

<span style="font-weight: 400;">Start → Administrative Tools → Services → File Replication Service → Double click</span>

<img src="https://i1.wp.com/www.rebeladmin.com/wp-content/uploads/2015/04/dfrs9.png?w=840" data-recalc-dims="1" />

&nbsp;

Reference: <http://www.rebeladmin.com/2015/04/step-by-step-guide-for-upgrading-sysvol-replication-to-dfsr-distributed-file-system-replication/>