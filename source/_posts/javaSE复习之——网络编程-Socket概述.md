---
title: javaSE复习之——网络编程_Socket概述
categories: JavaSE 复习
copyright: true
date: 2019-04-11 09:23:15
tags:
---
# Socket套接字概述

<!--more-->

* 网络上具有唯一标识的IP地址和端口号组合在一起才能构成唯一能识别的标识符套接字。（ip地址和端口一起构成一个能识别的标识符套接字）
* 通信的两端都有Socket。
* 网络通信其实就是Socket间的通信。
* 数据在两个Socket间通过IO流传输。
* Socket在应用程序中创建，通过一种绑定机制与驱动程序建立关系，告诉自己所对应的IP和port。


ps：也就是通信的两端都会创建一个Sockt套接字，然后俩个Scoket套接字进行通信。可以理解为一个航运的过程，Socket就是码头，来往的船只就是数据，海峡两岸的互相来往其实就是码头与码头的互相来往。