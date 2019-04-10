---
title: javaSE复习之——IO流_打印流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:44:43
tags:
- IO流
- 打印流
---
# 概念
> 可以很方便的将对象的toString()结果输出，并且自动加上换行，而且还可以使用自动刷出模式，自动刷出就是println一个数据就在文件中写入一个数据
> 
> - ps：
> System.out就是一个PrintStream，其默认向控制台输出信息

<!--more-->

### 打印流的类：
- printStream
	> 打印字节流
- printWrite	
	> 打印字符流

### 示例
```
	printWrite pw = new printWrite("1.txt");
	pw.println("111");
	//向文件写入111

```

### 注意事项
> 1、如果开启了自动刷出，那么只有println这么一个方法支持自动刷出
> 
> 2、print、println方法底层是把需要打印的数据转换成字符串再打印的
> 
> 3、write和print的不同之处是传入什么就直接写入什么

ps：打印流是只操作目的的，也就是只操作写出数据的