---
title: javaSE复习之——IO流_字符流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:05:27
tags:
- 字符流
- IO流
- 获取文本上每个字符出现的次数面试题
---
# 字符流概述
> 读写字符的IO流，字符流读取字符，需要先读取到字节数据，然后转为字符，如果要写出字符，需要把字符转为字节再写出
> 
> - ps：
> 字符流除了读取字符、不能拷贝非纯文本文件，其他功能都和字节流差不多，因为它底层就用到了FileInputStream与FileOutputStream

<!--more-->

### 字符流的继承体系：
- Reader
	- InputStreamReader
	> 它是字节流通向字符流的桥梁，可用用它指定码表

		- FlieReader
		> 文件字符输入流类

	- BufferedRead
	> 封装的缓冲区的输入流，它可以传入InputStreamReader

		- LineNumberReader


- Writer
	- InputStreamWrite
	> 它是字符流通向字节流的桥梁，可以用它指定码表

		- FileWrider	
		> 文件字符输出流类

	- BufferedWriter
	> 封装的缓冲区的输出流，它可以传入InputStreamWrite


### 字符流读取字符原理
> 读取到字节数据通过码表（gbk、utf-8等），一次读取一个字符
> 
> - ps：
> 汉字的码表前第一个字节一定是负数


### 写出字符流时的注意事项
> 1、写出字符流后`一定要关流`，否则不会写出去，因为字符流底层因为需要`先读取字节流然后通过码表读取文件内的字节`，所以他会创建一个缓冲区，当然这个缓冲区`只能用作字节与码表的转换`。
> 
> 2、只能拷贝纯文本文件，不可以拷贝非纯文本文件，因为在读的时候会将`字节转换为字符`，在转换过程中遇到找不到码表上的对应字符就会用？代替，这样写出的话会把？也写出去，这样文件就损坏了。
> 
> 3、在使用BufferedWrite创建字符输出流时，第二个参数不传入true则不清空文件中原来的数据


### 什么情况下使用字符流？
> 1、字符流可以拷贝文本文件，但是不推荐使用，因为读取时会把字节转换成字符，写出时还要把字符转换成字节，这样会大大的影响效率。
> 
> 2、程序需要读取一段文本，或者写出一段文本的时候可以使用
> 
> 3、读取的时候是按照字符大小读取的，所以不会出现半个中文等
> 
> 4、写的时候可以直接将字符串写出，不需要转换为字节数组


### 字符流中Buffered封装类的特殊方法：
- .readLine()
	> 读取一个文本行返回String，也就是读一行，此方法`遇到\r或者\n就认为某行已经终止`，它没有任何终止符，只要没数据了就返回null

- .newLine()	
	> 写出一个回车换行符，配合readLine使用，因为readLine是获取每行，而不会有换行，所以需要newLine换行。

- newLine与\r\n的区别
> 1、newLine是跨平台的方法，
> 
> 2、\r\n只支持windows系统



### BufferedReader子类`LineNumberReader`的特殊方法
- .getLineNumber()
	> 获取当前行号
- .setLineNumber()
	> 设置行号，放在遍历获取文本前可以起到初始行号的作用


### 使用指定码表读写字符
```
	InputStreamReader isr = new InputStreamReader(new FileInputStream(1.txt, "utf-8"));
	BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("1.txt"), "gbk"));
	//带buffered的
```
ps:写出字符流同理。


### 面试题之——获取文本上每个字符出现的次数
- 思路
> 1、创建输入流读取文本
> 
> 2、创建map集合保存每个字符出现的次数
> 
> 3、遍历输入流文本，然后判断每一个字符存入map集合，有相同的那就value加一，没有就加入并且value为1
> 
> 4、创建输出流
> 
> 5、遍历集合，把集合输出到文本
> 
> 6、关闭流

### 代码示例：
```
        BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("1.txt"), "gbk"));
        HashMap<Character, Integer> hm = new HashMap<>();
        int c;
        while ((c = br.read()) != -1) {
            char ch = (char)c;
            hm.put( ch, hm.containsKey(ch) ? hm.get(ch) + 1 : 1);
        }
        br.close();

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("2.txt"), "gbk"));
        for(Character me : hm.keySet()) {
            switch (me) {
                case '\t' : bw.write("\\t=" + hm.get(me));break;
                case '\n' : bw.write("\\n=" + hm.get(me));break;
                case '\r' : bw.write("\\r=" + hm.get(me));break;
                default:bw.write(me + "=" + hm.get(me));
            }
            bw.newLine();
        }
        bw.close();
    }
```