---
id: 27
title: Promote Windows 2012 R2 Domain Controller as a Primary DC
date: 2016-11-02T10:09:23+00:00
author: Navy Su
layout: post
---
Run operations on **the new Domain Controller server**.

<span style="font-weight: 400;">Server manager → Tools → Active directory Domains and Trusts</span>

<img class="alignnone size-full wp-image-37" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain1.png?fit=840%2C580" alt="win2k12-change-domain1" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain1.png?w=1019 1019w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain1.png?resize=300%2C207 300w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain1.png?resize=768%2C531 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 1362px) 62vw, 840px" data-recalc-dims="1" />

Click right button on Root (Active Directory Domains and Trusts [win2012 server name]) → Operations Master → Change… → close

<img class="alignnone size-full wp-image-38" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain2.png?fit=840%2C570" alt="win2k12-change-domain2" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain2.png?w=872 872w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain2.png?resize=300%2C204 300w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain2.png?resize=768%2C521 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 1362px) 62vw, 840px" data-recalc-dims="1" />

<span style="font-weight: 400;">Server manager → Tools → Active Directory Users and Computers</span>

<span style="font-weight: 400;">Click right button on the domain name → Operations master … → RIP tab → Chage … → PDC tab → Change… → Infrasturcture → Change… &#8212;> Close</span>

<img class="alignnone size-full wp-image-39" src="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain3.png?fit=762%2C529" alt="win2k12-change-domain3" srcset="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain3.png?w=762 762w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-change-domain3.png?resize=300%2C208 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<span style="font-weight: 400;">Start → Command Prompt (Admin) → regsvr32 schmmgmt.dll</span><figure id="attachment_31" style="width: 670px" class="wp-caption alignnone">

<img class="wp-image-31 size-full" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema1.png?fit=670%2C334" alt="win2k12-schema1" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema1.png?w=670 670w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema1.png?resize=300%2C150 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" /><figcaption class="wp-caption-text">regsvr32 schmmgmt.dll</figcaption></figure> 

<span style="font-weight: 400;">mmc → File → Add/Remove Snap-in … → Add “Active Dir</span><span style="font-weight: 400;">ectory Schema” → OK</span>

<img class="alignnone size-full wp-image-33" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema2.png?fit=760%2C517" alt="win2k12-schema2" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema2.png?w=760 760w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema2.png?resize=300%2C204 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<span style="font-weight: 400;">right click “Active Directory Schema” → Change Active Directory Domain Controller → Choose win2012 server (cc-dc2.cc01.adlan)</span>

<img class="alignnone size-full wp-image-34" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema3.png?fit=758%2C371" alt="win2k12-schema3" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema3.png?w=758 758w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema3.png?resize=300%2C147 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-35" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema4.png?fit=632%2C430" alt="win2k12-schema4" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema4.png?w=632 632w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema4.png?resize=300%2C204 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<span style="font-weight: 400;"> right click “Active Directory Schema [cc-dc2.cc01.adlan]” → Operations Master … → Change… → Close</span>

<img class="alignnone size-full wp-image-36" src="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema5.png?fit=360%2C270" alt="win2k12-schema5" srcset="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema5.png?w=360 360w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2016/11/win2k12-schema5.png?resize=300%2C225 300w" sizes="(max-width: 360px) 85vw, 360px" data-recalc-dims="1" />

<span style="font-weight: 400;">Check status in command prompt window (example output. Win2012 server name is CC-DC2.cc01.adlan):</span>

```bash
&gt; netdom query fsmo

Schema master				CC-DC2.cc01.adlan

Domain naming master			CC-DC2.cc01.adlan

PDC					CC-DC2.cc01.adlan

RID pool manager			CC-DC2.cc01.adlan

Infrastructure master		        CC-DC2.cc01.adlan
```

