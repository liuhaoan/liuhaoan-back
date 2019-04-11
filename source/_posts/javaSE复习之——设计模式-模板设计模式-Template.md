---
title: javaSE复习之——设计模式_模板设计模式(Template)
categories: JavaSE 复习
copyright: true
date: 2019-04-11 10:10:39
tags:
- 设计模式
- 模板设计模式
- Template
---
# 模板设计模式的概述
> 就是定义一个算法的骨架，而将具体的算法延迟到子类中来实现


### 优点和缺点
- 优点
	> 使用模板方法模式，在定义算法骨架的同时，可以很灵活的实现具体的算法，满足用户灵活多变的需求

- 缺点
	> 如果算法骨架有修改的 话，则需要修改抽象类

<!--more-->

### 代码示例
```
	public static void main(String[] args) {
		Demo d = new Demo();
		System.out.println(d.getTime());
	}


	abstract class GetTime {
		public final long getTime() {
			long start = System.currentTimeMillis();
			code();
			long end = System.currentTimeMillis();
			return end - start;
		}

		public abstract void code();
	}

	class Demo extends GetTime {

		@Override
		public void code() {
			int i = 0;
			while(i < 100000) {
				System.out.println("x");
				i++;
			}
		}
	}
```
ps：当然也可以直接使用匿名内部类



# 已学设计模式总汇
- 装饰设计模式
- 单例设计模式
- 简单工厂设计模式
- 工厂方法设计模式
- 适配器设计模式
- 模板设计模式