---
title: javaSE复习之——IO流_内存输出流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:28:05
tags:
- IO流
- 内存输出流
- 内存输出流面试题
---
# 内存输出流的概述
> 该输出流可以`向内存中写数据`，把内存当作一个缓冲区，写出之后可以一次性获取出所有数据。

- 内存输出流类
	> ByteArrayOutputStream

ps：它其实是一个缓冲区，实例化这个类时在内存中创建了一个可以增长的字节数组，所以它可以不用关闭流，因为`根本就只是个缓冲区`。

<!--more-->

### ByteArrayOutputStream的方法
- .toByteArray()	
	> 获取缓冲区全部数据，返回一个byte[]
- .toString(可传入码表)
	> 获取缓冲区全部数据，根据平台默认码表返回String

### 应用场景
> 字节流读取文本时可能读取到半个汉字，所以可以用内存输出流，把文本放到缓冲区中。


### 为什么当要读取文本内容并且操作时不直接用字符流？
- 1、我们不知道这个文本一共有多少个字符，所以不好定义数组缓冲区。

- 2、虽然可以使用数组来实现缓冲区，但是太麻烦，代码量更多，而ByteArrayOutputStream却很方便。


### 内存输出流面试题
> 定义一个文件输入流，调用read方法，将a.txt文件中的内容打印出来，byte大小为5

- 代码示例

```
        FileInputStream fis = new FileInputStream("a.txt");
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        byte b[] = new byte[5];
        int n;
        while ((n = fis.read(b)) != -1) {
            baos.write(b, 0, n);
			//写入到内存输出流
        }
        System.out.println(baos.toString("gbk"));
        fis.close();

```