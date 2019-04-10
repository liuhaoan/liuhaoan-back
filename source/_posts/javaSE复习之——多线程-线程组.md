---
title: javaSE复习之——多线程_线程组
categories: JavaSE 复习
copyright: true
date: 2019-04-10 17:33:09
tags:
- 多线程
- 线程组
---
# 线程组的概述
> 它可以对一批线程进行分类管理，java允许程序直接对线程组进行控制

### 线程组的类
> ThreadGroup

<!--more-->

### 线程组类中的方法
- .getName()	
	> 通过线程组对象获取他组的名字，返回String，默认所属组为main主线程


### 创建一个线程组
```
ThreadGroup tg = new ThreadGroup("线程组名称");
//不传入线程组名称则默认线程组为main主线程
```

### 创建一个线程并且放在某个组内
```
Thread t = new Thread(创建好的线程组，要创建线程的对象，线程名(可不填));
```


### 线程组的作用举例
> 当我们执行 tg.setDaemon(true) 设置成守护线程时，线程组内所有线程都被设置成了守护线程