---
title: javaSE复习之——JDK5新特性之_自动拆箱与装箱
categories: JavaSE 复习
copyright: true
date: 2019-04-09 17:13:54
tags:
- 新特性
- JDK5
- 自动拆箱
- 自动装箱
---
# 代码详解

```
int x = 123;
Integer i1 = new Integer(x);
//手动装箱

int y = i1.intValue();
//手动拆箱

Ineger x = 123;
//自动装箱，他的底层是手动装箱

int a = x + 100;
//自动拆箱，他的底层是自动拆箱
```