---
title: javaSE复习之——异常
categories: JavaSE 复习
copyright: true
date: 2019-04-10 14:29:06
tags:
- 异常
- throw
- throws
- final，finally和finalize的区别面试题
---
# 异常的概述
> 异常就是java程序在运行过程中出现的错误

### 异常类
> Throwable


### 异常的继承体系：
- Throwable
	- Error
	> 服务器出问提，数据库崩溃等

		- Exception
			- RuntimeException
				> 这个是运行时异常，全部的运行时异常都在这，一般都是我们自己犯的错误，修改代码即可

			- 。。。。。等等

<!--more-->

### jvm默认的异常处理机制
> 会将异常的名称、异常的信息、异常出现的位置打印在控制台，并且程序停止运行。


### 异常处理命令
> try...catch

- try
	> 用来检测异常，如果出现异常，那么会抛出一个对应的异常对象
- catch
	> 用来捕获异常，需要定义一个引用来接收异常对象，可以使用多个catch来捕获多种异常。
	> 
	> ps：理论上是有什么错误用什么去引用，但是实际开发建议直接创建Exception这个父类引用它的子类对象。
- finally
	> 释放资源，一般对io流或者数据库进行关闭

- 它们三的常用搭配：
> 1、try catch
> 异常处理基本格式
> 
> 2、try catch finally
> 
> 3、try finally

ps：。。。。。世界上最真情的相依就是你在try我在catch，无论你发神马脾气，我都静静接收，默默处理。。。。

### 小知识：
> 1、安卓开发属于客户端开发，一般都是直接Exception
> 
> 2、javaEE属于服务端开发，一般都是底层开发，从`底层向上抛`，最后放到一个错误日志。
> 
> 3、在有多个catch时，大的异常放后面，因为根据多态的原理，大的异常放前面没有意义。


### jdk7以后如何处理多个异常，有时候面试会问
> 用`“|”`连接两个异常类即可实现`一个catch处理多个异常`，但是这样还不如直接Exception。


### java异常的种类
> Java异常被分为两大类，分别是编译时异常和运行时异常。
- 编译时异常
	> java程序必须显示处理，否则就会发生错误，不处理无法通过编译

- 运行时异常
	> 无需显示处理，也可以和编译时异常一样处理


### Throwable的几个常见方法：
- .getMessage()
	> 获取异常信息，返回字符串
- .toString()
	> 获取异常类名和异常信息，返回字符串
- .printStackTrace()	
	> 获取异常类名和异常信息，以及异常出现在程序中的位置，返回值void，jvm默认用它处理异常。



### 异常抛出
> throw new 异常类


- 注意事项：
	> 除了`RuntimeException类`的错误，也就是运行时错误，其他错误都要在方法上使用throws向上抛出这个错误。


- 异常的抛出例子：

```
	public void setAge(int age) throws Exception{
		if(age > 0 || age < 150) {			
			this.age = age;
		}else {
			throw new Exception("年龄非法");
		}
	}
```

# throw概述
> 在功能方法内部出现某种情况，程序不能继续运行，需要进行跳转时，就用throw把异常抛出

### throws和throw区别，可能面试会问：
- throws
	> 1、用在方法声明后面，跟的时异常类名
	> 
	> 2、可以跟多个异常类名，用逗号隔开
	> 
	> 3、表示这个方法抛出了异常，`让方法的调用者来处理`

- throw
	> 1、用在方法体内部，跟的时异常对象名
	> 
	> 2、只能抛出一个异常对象名，不能接多个
	> 
	> 3、表示这个方法抛出了异常，`方法内部处理`


### finally特点：
> 被finally控制的语句一定会执行，就算执行了return语句finally中的语句也会执行
> 
> **特殊情况：**
> 在执行到finally之前jvm退出了，比如执行`System.exit(0)`

### finally作用
> 用于资源释放，通常在哎IO流和数据库操作中会使用

### finally关键字的面试题：
- **final，finally和finalize的区别**
> 解答：
> **final：**
> 修饰类不能被继承，修饰方法不能被重写，修饰变量只能赋值一次（常量）
> 
> 
> **finally：**
> 它是tyr语句中的语句体，不能单独使用，它用来释放资源
> 
> 
> **finalize：**
> 是一个方法，当垃圾回收器确定不存在对该对象的引用时，对象的垃圾回收器调用此方法。
ps：他们三没任何联系，只是长得像而已。

- **如果catch里面有return语句，请问finally的代码还会执行吗?如果会请问时在return前还是return后？**
> 解答：
> 会，并且是在return之后执行，因为在return相当于已经建立好了一个返回路径，然后再执行finally，然后再根据之前建立的返回路径彻底返回。
> 
> ps：千万不要再finally内写返回语句，因为finally的作用是为了释放资源，如果再这里写返回语句，那么try和catch的结果都会被改变。


### 自定义异常方法
> 定义一个异常类，然后继承Exception并重写构造方法即可

### 代码示例：
```
class AgeOutOfBoundsException extends Exception {

	public AgeOutOfBoundsException() {
		super();
		
	}

	public AgeOutOfBoundsException(String message) {
		super(message);
		
	}
	
}
```

### 为什么要自定义异常？
- 解答：
	> 只是为了看那个异常类的名字而已，这样好排错。
	> 
	> ps：继承RuntimeException的话可以不用在声明方法那里抛出异常


### 异常注意事项
> 1、子类重写父类方法时，`子类必须抛出相同异常或者父类异常的子类`，也就是说`子类抛出的异常不能比父类大`，需要比父类更加细，打个比方，父亲坏儿子不能比他更坏。父亲没坏儿子自己处理
> 
> 2、如果父类抛出多个异常，子类重写父类的时候`子类不能抛出父类没有的异常`
> 
> 3、如果被重写的方法没有抛出异常，那么子类绝对不可以抛出异常，如果子类有异常只能用try不能throws抛出


### 如何使用异常处理？
- 原则：
	> 如果该功能内部可以将问题处理，就用try，不能处理就用throws向上抛出，交给调用者处理
- 区别：
	> 1、后面还有代码需要执行，就用try
	> 
	> 2、如果后面不需要代码执行了，就用throw