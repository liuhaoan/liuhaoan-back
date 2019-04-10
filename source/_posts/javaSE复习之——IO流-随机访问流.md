---
title: javaSE复习之——IO流_随机访问流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:36:22
tags:
- IO流
- 随机访问流
---
# 概述
> 它可以在文件任何位置开始读，也可以在文件任何地方开始写。
> 
> - ps：
> 其实它不属于流，因为`它的父类是Object`，但是呢，它融合了InputStream与OutpuStream的功能，所以他同时具备了读和写的功能。

<!--more-->

### 使用场景
- 多线程下载
	> 我们可以让第一条线程下载0-1000第二条线程下载1000-2000，以此类推。

### 随机访问流类
> RandomAccessFile

### 随机访问流的方法：
- .seek()
	> 设置开始位置指针
- .write()
	> 写
- .read()
	> 读