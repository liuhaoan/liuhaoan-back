---
title: javaSE复习之——IO流_数据输入输出流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:42:32
tags:
- IO流
- 数据输入输出流
---
# 概述
> 它可以按照`基本数据类型`的大小读写数据，因为字节流读文件时向那个字节前面加8个二进制位组成一个int，写文件时会自动砍掉int的前8个二进制位，所以我们直接读写int类型数据时文本数据会出错，而数据输入输出流就不会这样，他会把`基本数据类型所有字节全部写出去`，不过开发用到的不多。

<!--more-->

### 例如
> 按照long大小读写一个数的时候，写出数据会占8个字节，而读取数据也会一次读8个

### 数据输入输出流的类
> DataInputStream、DataOutputStream


### 使用方式
```
DataInputStream dis = new DataInputStream(new FileInputStream("1.txt))；
```