---
title: javaSE复习之——String与int的相互转换
categories: JavaSE 复习
copyright: true
date: 2019-04-09 17:04:41
tags:
- String与int的相互转换
- String转int
- int转String
---
# String转int
> 1、String s1 = 1 + ""；
> 
> 2、String s2 = string.toString(1);
> 
> 3、Integer i = new Integer(1);		String s1 = i.toString();
> 
> 4、String s1 = Integer.toString(1);

ps:推荐用第一第二种方式，代码更简洁。

<!--more-->

# int转String
> 1、
> ```
String s1 = "123";
Integer i = new Integer(s1);
int a = i.intValue();
```
>
> 2、
> ```
String s1 = Integer.parseInt(123);
```
ps:推荐用第二种