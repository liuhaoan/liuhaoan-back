---
title: javaSE复习之——String转换为其他数据类型
categories: JavaSE 复习
copyright: true
date: 2019-04-09 17:10:35
tags:
- String
- String转换为其他数据类型
---
- 代码：
> .parseXXX("");

- 特点：
> 基本数据类型包装类有八种，其中除了char其他都有`.parseXXX()`方法，因为char只能存入一个字符。

- 代码示例：

```
String s1 = "123";
int i = Integer.parseInt(s1);
```