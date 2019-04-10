---
title: javaSE复习之——设计模式_装饰设计模式
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:21:47
tags:
- 设计模式
- 装饰设计模式
---
# 装饰设计模式代码示例

<!--more-->

```
interface Coder {
	public void code();
}

class Student implements Coder {

	@Override
	public void code() {
		System.out.println("javase");
		System.out.println("javaweb");
	}
	
}

class HeiMaStudent implements Coder {
	//1,获取被装饰类的引用
	private Student s;
	//获取学生引用
	
	//2,在构造方法中传入被装饰类的对象
	public HeiMaStudent(Student s) {
		this.s = s;
	}

	//3,对原有的功能进行升级
	@Override
	public void code() {
		s.code();
		System.out.println("ssh");
		System.out.println("数据库");
		System.out.println("大数据");
		System.out.println("...");
	}
}
```
### 装饰设计模式的好处
> 耦合性不强,被装饰的类的变化与装饰类的变化无关