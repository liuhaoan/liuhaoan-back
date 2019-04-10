---
title: javaSE复习之——IO流_序列流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:24:36
tags:
- IO流
- 序列流
---
# 序列流概述
> 序列流可以把`多个字节输入流整合成一个`，从序列流中读取数据时，将从被整合的第一个流开始读，然后依次往后读，也就是把`N个流合成成一个流`，这样方便操作。 

<!--more-->

- 序列流类
	> SequenceInputStream

### 两个流合并序列代码示例
```
	SequenceInputStream sis = new SequenceInputStream(FileInputStream, FileInputStream)；
```


### N个流合并序列代码示例
- ps：
	> 因为需要N个流合并的话，那么SequenceInputStream 构造方法就需要传入一个流的枚举，而Vector集合中有一个方法elements使返回一个枚举，所以我们可以使用集合，`把流对象先放在集合中，然后再获取这个集合的枚举`，最后传给SequenceInputStream 构造方法。

```
        Vector<FileInputStream> v = new Vector<>();
        v.add(new FileInputStream("a.txt"));
        v.add(new FileInputStream("b.txt"));
        v.add(new FileInputStream("c.txt"));
        SequenceInputStream sis = new SequenceInputStream(v.elements());
        FileOutputStream fos = new FileOutputStream("abc.txt");
        int t;
        while ((t = sis.read()) != -1) {
            fos.write(t);
        }
        fos.close();
        sis.close();
```

- 使用场景1：
	> 当我们需要读取两个文件，并且需要把两个文件整合成一个文件时，不使用序列流就会使代码不简洁，使用序列流就只要操作序列流即可。
- 使用场景2
	> 如果想把两个MP3合成成一个MP3就可以用到，这样就会播放完第一个直接播放下一个。