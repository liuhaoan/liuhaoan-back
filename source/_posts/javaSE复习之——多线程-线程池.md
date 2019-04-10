---
title: javaSE复习之——多线程_线程池
categories: JavaSE 复习
copyright: true
date: 2019-04-10 17:38:29
tags:
- 多线程
- 线程池
- JDK5新特性Executors工厂类
---
# 线程池的概述
- 一个形象的比喻：
	> 把很多线程全部养在一个池子里，要用就拿出来用，不用就放回去，还不会死掉的。这样就不用一直创建-死亡，因为线程的创建-死亡需要与计算机系统交互，这样的成本是很高的，用上线程池就可以很好的提高性能，尤其是程序中有很多生存周期短的线程。在jdk5之前必须手动创建线程池，jdk5之后java内置线程池

<!--more-->


### jdk5新增了一个Executors工厂类来生产线程池，有如下几个方法：
- .newFixedTreadPool(int)
	> 创建一个线程池int传多少就是可以放多少线程
- .newSingleTreadExecutor()
	> 创建一个可以放一条线程的线程池

### 线程池对象
> ExecutorService

### ExecutorService线程池对象中的方法：
- .submit(线程对象)
	> 把线程放入线程池中，并且执行
- .shutdown()
	> 关闭线程池


### 创建线程池示例
```
	ExecutorService es = Executors.newFixedTreadPool(12)

```