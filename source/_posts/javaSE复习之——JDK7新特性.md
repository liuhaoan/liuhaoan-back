---
title: javaSE复习之——JDK7新特性
categories: JavaSE 复习
copyright: true
date: 2019-04-11 14:33:06
tags:
---
# JDK7新特性总汇
- 二进制字面量（比如0b110，它可以直接写出来，他代表二进制的110，也就是十进制的6）
- 数字字面量可以出现下划线（100_00写法不会错，它表示10000）
- switch 语句可以用字符串
- 泛型简化、菱形泛型
- 异常的多个catch可以合并，每个异常用 | 比如：catch（异常1 | 异常2）
- try-with-resources 语句（jdk1.7标准的异常处理代码，就是之前那个关流的）