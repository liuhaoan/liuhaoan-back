---
title: javaSE复习之——多线程_两线程通信
categories: JavaSE 复习
copyright: true
date: 2019-04-10 17:24:13
tags:
- 多线程
- 两线程通信
- sleep方法和wait方法的区别是什么（面试题）
---
### 什么时候需要通信
> 多线程并发时，在默认情况下CPU时随机切换线程执行的，如果我们希望他们又规律的执行，就可以使用通信，例如每个线程执行一次打印

<!--more-->


### Object中方法：
- .wait()
	> 让本线程等待（暂停运行）
- .notify()
	> 让一条线程停止等待，当有多条线程等待是随机停止等待一条
- .notifyAll()
	> 让所有等待线程停止等等待

### 为什么wait方法和notify方法定义在object中？
- 答：
	> 因为锁对象可以是任意对象，而Object是所有类的基类，所以他们两个定义在Object中

### sleep方法和wait方法的区别是什么（面试题）？
> 1、sleep方法必须传入参数时间到了自动醒来
> 
> 2、wait方法可以传入参数也可以不传入参数，传入参数就是在参数时间后等待，不传入则立马开始等待
> 
> 3、sleep在同步代码块或者同步函数中，**不会释放锁**（cpu会一直在这个方法或者代码块中等待）
> 
> 4、wait在同步函数或者同步代码块中，**会释放锁**（让cpu可以去执行其他线程）



### 线程之间通信注意事项：
> 带同步代码块中，用哪个对象锁，就用哪个对象调用wait方法等待


### 线程通信例子（jdk1.5版本之前解决方案）
```
//等待唤醒机制
class Printer {
	private int flag = 1;
	public void print1() throws InterruptedException {							
		synchronized(this) {
			if(flag != 1) {
				this.wait();
				//当前线程等待
			}
			System.out.print("加");
			System.out.print("油");
			System.out.print("加");
			System.out.print("油");
			System.out.print("！");
			System.out.print("\r\n");
			flag = 2;
			this.notify();
			//随机唤醒单个等待的线程
		}
	}
	
	public void print2() throws InterruptedException {
		synchronized(this) {
			if(flag != 2) {
				this.wait();
			}
			System.out.print("加");
			System.out.print("油");
			System.out.print("加");
			System.out.print("油");
			System.out.print("\r\n");
			flag = 1;
			this.notify();
		}
	}
}
```

ps：两个以以上线程进行通信增加flag值修改即可，不过必须是使用notifyAll，并且判断语句需要使用while不能使用if