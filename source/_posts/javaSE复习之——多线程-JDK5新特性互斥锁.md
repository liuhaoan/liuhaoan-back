---
title: javaSE复习之——多线程_JDK5新特性互斥锁
categories: JavaSE 复习
copyright: true
date: 2019-04-10 17:27:57
tags:
- 多线程
- JDK5新特性
- 互斥锁
---
# 概述
> 它是锁（synchronized）的封装类，它更加的强大

### 互斥锁类
> reentrantLock

<!--more-->

### 监视器类
> Condition（封装了一下Object中的监视器方法）

### 互斥锁方法
- .lock()
	> 获得一个锁
- .unlock()
	> 释放此锁
- .newCondition()
	> 获取一个Condition监视器对象，用来进行线程通信


### 通过互斥锁线程通信示例
```
class Printer3 {
	private ReentrantLock r = new ReentrantLock();
	private Condition c1 = r.newCondition();
	private Condition c2 = r.newCondition();
	private Condition c3 = r.newCondition();
	
	private int flag = 1;
	public void print1() throws InterruptedException {							
		r.lock();
		//获取锁
			if(flag != 1) {
				c1.await();
			}
			System.out.print("加");
			System.out.print("油");
			System.out.print("加");
			System.out.print("油");
			System.out.print("！");
			System.out.print("\r\n");
			flag = 2;
			//this.notify();
			//随机唤醒单个等待的线程
			c2.signal();
		r.unlock();
		//释放锁
	}
	
	public void print2() throws InterruptedException {
		r.lock();
			if(flag != 2) {
				c2.await();
			}
			System.out.print("加");
			System.out.print("油");
			System.out.print("加");
			System.out.print("油");
			System.out.print("\r\n");
			flag = 3;
			//this.notify();
			c3.signal();
		r.unlock();
	}
	
	public void print3() throws InterruptedException {
		r.lock();
			if(flag != 3) {
				c3.await();
			}
			System.out.print("a");
			System.out.print("b");
			System.out.print("c");
			System.out.print("d");
			System.out.print("e");
			System.out.print("f");
			System.out.print("g");
			System.out.print("\r\n");
			flag = 1;
			c1.signal();
		r.unlock();
	}
}
```