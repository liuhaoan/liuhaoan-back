---
title: javaSE复习之——注解
categories: JavaSE 复习
copyright: true
date: 2019-04-15 10:36:22
tags:
- 注解
- JDK5新特性
---
# 注解概念
> 它是用来说明程序的，我们知道**注释**是给程序员看的，那么**注解**就是给程序看的。

<!--more-->


#### 注解的作用
- 用来编译检查
	> 通过代码中的标识，编译器可以实现最基本的编译检查


- 撰写文档
	> 通过代码里的注解生成文档

- 代码分析
	> 通过代码里标识的注解对代码进行分析（使用反射）


#### JDK中预定义好的注解
- @Deprecated
	> 意思是“废弃的，过时的”，标识方法后表示这个方法是过时的，不建议用，但还是可以用

- @Override
	> 意思是“重写、覆盖”，用来检查是否继承自父类（接口）的

- @SuppressWarnings
	> 意思是“压制警告”，编译器会有很多黄色的警告，我们不想看到它就可以使用SuppressWarnings
	> 使用方法：@SuppressWarnings（“all”）
	> 作用是压制所有警告
	> 
	> 一般传递参数“all”


#### 自定义注解
- **格式（分为两部分）：**
```
	元注解
	public @interface 注解名称{
		属性列表
	}```

- **本质：它本质上就是一个接口，该接口默认继承Annotation接口**
	- public interface 接口名称(注解名称) extends java.lang.annotation.Annotation {}

- **属性：接口中的抽象方法**
	- 要求：
	> 1、属性的返回值类型由下列取值
	> - 基本数据类型
	> - String
	> - 枚举
	> - 注解
	> - 以上类型的数组
	> 
	> 2、定义了属性，在使用时需要给属性赋值
	> - 如果定义属性时使用Default关键字给属性默认初始化值，则使用注解时，可以不进行属性的赋值。
	> - 如果只有一个属性需要赋值，并且属性的名称是value，则value可以省略，直接定义值即可
	> - 数组赋值时，使用{}包裹。如果数组中只有一个值，{}可以省略

	- 属性的使用
	`@注解名(属性名 = 属性值)`

- 元注解：用于描述注解的注解
	- **@Target：描述注解能够作用的位置**
		- ElementType取值：
			- TYPE:可以作用在类上
			- METHOD：可以作用于方法上
			- FIELD：可以作用在成员变量上
	- **@Retention：描述注解被保留的阶段**
		- @Retention(RetentionPolicy.RUNTIME)：当前被描述的注解会被保留到class字节码中，并且被jvm读取到
	- **@Documented**
		> 描述注解被提取到api文档中（在文档中显示）
	- **@Inherited**
		> 描述注解被子类继承（子类继承父类的注解）



#### 使用注解（解析注解）
1. 自定义一个注解，比如这个注解的属性有：className() 和 MtehodName()
2. 创建一个类，使用这个注解，并且给属性赋值
3. 获取该类的字节码文件对象
```
Class<刚刚创建的类名> reflectClass = 类名.class
```
4. 获取注解对象
```
注解名 an = reflectClass.getAnnotation(注解名.class)
```
ps：其实就是在内存中生成了一个该注解接口的**子类实现对象**
```
//在内存中生成的子类实现对象
public alcss ProImpl implements Pro {
	public String className() {
		return "com.liuhaoan.annotation.Demo1";
	}
	
	public String methodName {
		return "show";
	}
}
```

5. 调用注解抽象方法获取配置属性值
```
String className = an.className();
String methodName = an.methodName();
```

#### 小结
1. 以后大多数时候，我们会使用注解，而不是自定义注解
2. 注解给谁用？
	1. 编译器
	2. 解析程序（比如测试框架）
3. 注解不是程序的一部分，而是类似于标签。