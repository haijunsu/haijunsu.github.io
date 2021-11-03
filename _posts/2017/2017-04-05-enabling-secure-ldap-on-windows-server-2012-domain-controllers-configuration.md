---
id: 473
title: 'Enabling Secure LDAP on Windows Server 2012 Domain Controllers: Configuration'
date: 2017-04-05T13:33:16+00:00
author: Navy Su
layout: post
---
Installing Enterprice Root CA

<img class="alignnone size-full wp-image-480" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ServerRoles-2.png?fit=797%2C567" alt="" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ServerRoles-2.png?w=797 797w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ServerRoles-2.png?resize=300%2C213 300w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ServerRoles-2.png?resize=768%2C546 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-476" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/RoleServices.png?fit=763%2C537" alt="" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/RoleServices.png?w=763 763w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/RoleServices.png?resize=300%2C211 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

Configure CA service

<img class="alignnone size-full wp-image-477" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/configuration_link.png?fit=326%2C305" alt="" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/configuration_link.png?w=326 326w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/configuration_link.png?resize=300%2C281 300w" sizes="(max-width: 326px) 85vw, 326px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-478" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service2.png?fit=727%2C532" alt="" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service2.png?w=727 727w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service2.png?resize=300%2C220 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-479" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service3.png?fit=728%2C530" alt="" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service3.png?w=728 728w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service3.png?resize=300%2C218 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-481" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service4.png?fit=725%2C529" alt="" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service4.png?w=725 725w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service4.png?resize=300%2C219 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-482" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service5.png?fit=726%2C531" alt="" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service5.png?w=726 726w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service5.png?resize=300%2C219 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-483" src="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service6.png?fit=724%2C528" alt="" srcset="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service6.png?w=724 724w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/Role-Service6.png?resize=300%2C219 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-484" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/CA-Name.png?fit=728%2C529" alt="" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/CA-Name.png?w=728 728w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/CA-Name.png?resize=300%2C218 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-485" src="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/validityPeriod.png?fit=727%2C528" alt="" srcset="https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/validityPeriod.png?w=727 727w, https://i0.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/validityPeriod.png?resize=300%2C218 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-486" src="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/CA-Database.png?fit=727%2C529" alt="" srcset="https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/CA-Database.png?w=727 727w, https://i2.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/CA-Database.png?resize=300%2C218 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

Reboot server and test

<img class="alignnone size-full wp-image-487" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ps-ldp.png?fit=781%2C103" alt="" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ps-ldp.png?w=781 781w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ps-ldp.png?resize=300%2C40 300w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ps-ldp.png?resize=768%2C101 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" data-recalc-dims="1" />

<img class="alignnone size-full wp-image-489" src="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ldp1-1.png?fit=441%2C355" alt="" srcset="https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ldp1-1.png?w=441 441w, https://i1.wp.com/navysu.x10host.com/wp-content/uploads/2017/04/ldp1-1.png?resize=300%2C241 300w" sizes="(max-width: 441px) 85vw, 441px" data-recalc-dims="1" />

Source: <https://www.youtube.com/watch?v=JFPa_uY8NhY>