---
title: javaSE复习之——JDK5新特性
categories: JavaSE 复习
copyright: true
date: 2019-04-11 14:20:54
tags:
- 枚举
- JDK5新特性
---
# jdk5新特性总汇
- 自动拆箱装箱
- 泛型
- 可变参数
- 静态导入
- 增强for循环
- 互斥锁
- 枚举

<!--more-->

# 枚举的概述
> 是指将变量的值一 一列出来，变量的值只限于枚举出来的值的范围。
> - 举例：
> 一周有7天，一年有12个月等
	
### 回想单例设计模式
> 单例类是一个类只能有一个实例，那么多例类就是一个类可以有多个实例，但不是无限个数的实例，而是有个数限制，这就是枚举类

ps：枚举类可以自己实现，也可以通过enum实现枚举类


### 枚举的注意事项
> 1、定义枚举类需要用关键字enum
> 
> 2、所有枚举类都是Enum的子类
> 
> 3、枚举的第一行上必须是枚举项，也就是案例中的MON等，最后一个枚举项的分号是可以省略的，如果有其他东西就不要省略，建议不省略
> 
> 4、枚举类可以有抽象方法，但是枚举项必须重写该方法
> 
> 5、枚举类可以有构造器，但是必须是private的
> 
> 6、枚举可以在switch中使用


### 枚举类的常见方法：
- .ordinal
	> 返回枚举常量的序数（也就是在枚举声明中的位置，从0开始）
- .compareTo(传入枚举项)
	> 把两个枚举项进行比较，比较的是编号，也就是叙述
- .name
	> 获取实例名称
- .valueOf(枚举字节码，枚举项名称)
	> 通过枚举类的字节码文件与枚举项名称获取枚举项的实例
- .values
	> 获取所有枚举项，返回一个数组




### 自己实现枚举类案例
```
	public abstract class Week3 {
	
		public static final Week3 MON = new Week3("星期一") {
			public void show() {
				System.out.println("星期一");
			}
		};
		public static final Week3 TUE = new Week3("星期二"){
			public void show() {
				System.out.println("星期二");
			}
		};
		public static final Week3 WED = new Week3("星期三"){
			public void show() {
				System.out.println("星期三");
			}
		};
	
		private String name;
		private Week3(String name){
			this.name = name;
		}
		//私有构造,不让其他类创建本类对象

		public String getName() {
			return name;
		}
	
		public abstract void show();
	}
```



### 通过enum来实现枚举
```
public enum Week3 {
	MON("星期一"){
		public void show() {
			System.out.println("星期一");
		}
	},TUE("星期二"){
		public void show() {
			System.out.println("星期二");
		}
	},WED("星期三"){
		public void show() {
			System.out.println("星期三");
		}
	};
	
	private String name;
	private Week3(String name) {
		this.name = name;
	}
	public String getName() {
		return name;
	}
	
	public abstract void show();
	
}
```