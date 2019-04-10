---
title: javaSE复习之——IO流_标准输入输出流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:51:29
tags:
- IO流
- 标准输入输出流
---
# 概念
- System.in
	> 是InputStream，他们是标准输入流，默认可以从键盘读取字节数据，Scanner的底层就是用它。
- System.out
	> 是printStream，他们是标准输出流，默认可以向console（控制台）中输出字符宣传和字节数据

<!--more-->

### 修改标准输入输出流
- 修改输入流
	> System.setIn(InputStream)
- 修改输出流
	> System.setOut(printStream)
ps：如果修改标准输入输出流指向文件的话，那么输入流就不会从键盘读了，而是从文件，输出流同理。


### 代码示例
```
InputStream is = new System.in;
int x = is.read();
//从键盘读取一个字节
System.out.println(x)；
```

ps：输入48打印52，因为read一次只读一个字节，也就是这里只读到了4，而我们输入的4是一个字符类型的数据，所以read会通过码表获取字符类型4对应的值，也就是52，最后打印的也就是52了

### 输入流注意事项
> 输入流只有一个对象，再用System.in是不能再创建的，当然标准输入流是不需要关的，除非和某个文件关联了，因为关联了文件会占用资源