---
title: JavaScript之——ECMAScript客户端脚本语言标准
categories: JavaScript
copyright: true
date: 2019-05-07 10:24:13
tags:
- ECMAScript
- 客户端脚本语言标准
- 什么是变量
- 面试题
---
# 基本语法
- 两种与html结合方式
	- 内部js
		- html的script标签中，并且html是从上向下执行的，所以js操作html组件时需要放在组件下面
	- 外部js
		- 定义script标签，然后通过src属性导入外部js文件
	- 注意事项：
		- `<Script>`定义的位置会影响执行顺序
		- `<Script>`可以定义多个

<!--more-->



### 注释
- 单行注释：//
- 多行注释：/**/


### 数据类型：
- 原始数据类型（基本数据类型）
	- `number`：数字(整数/小数/NAN not a number 一个不是数字的数字类型)
	- `String`：字符/字符串
	- `boolean`：true 与 false
	- `null`：一个对象为空的占位符
	- `undefind`：未定义。如果一个变量没有给初始化值，则会默认给它赋值为undefind

ps：NAN与任何数字做运算还是NAN

ps：原始数据类型虽然平时不需要知道js也能写的很好，但是这种不常见，又很基础的知识面试的时候经常会用到

- 引用数据类型(对象)




### 变量
> 一小块内存区域

- 在java中，当我们声明一个变量时，会在内存中申请一个内存区域，例如`boolean b = true;`，那么这个内存区域的类型就是boolean的，并且给这个内存区域取名为变量名，所以它是强类型语言

- 在JavaScript中，也是和java一样申请一个内存区域，然后给这个空间起一个变量的名称，这个名称就是变量名，但是它这个内存区域是没有定义数据类型的，所以它是弱类型语言，比如：`var a = 1；` 定义完之后还可以给它赋值String类型数据


**总的来说，变量就是一小块存储数据的内存空间**


- Java是强类型的语言，JavaScript是弱类型的语言

- 强类型：在声明变量时，会定义空间的数据类型，所以申请的内存区域数据类型是不能变的，也就是说这块空间只能存某种数据类型的数据
- 弱类型：在声明变量时，不会定义空间数据类型，所以可以存放任意数据类型的数据

语法：var 变量名 = 初始化值;



### 运算符
- 一元运算符：只有一个运算数的运算符，++、--、+(-)等
	- **注意：在js中，如果运算数不少运算符所要求的类型，那么js引擎会自动将运算数进行类型转换**
	- **其他类型转number：**
		- **String转number：按照字面值转换，如果字面值不少数字，那么就转为NAN（不是数字的数字）**
		- **boolean转number：true转为1， false转为0**


- 算数运算符：+ - * /
- 赋值运算符：= += -+...
- 比较运算符：< > >= <= == ===(全等于)
	- 类型相同：直接比较
		- 字符串：按照字典顺序比较，按位逐一比较，知道得出大小为止
	- 类型不同：先类型转换再比较
	- **===全等于：判断之前先判断类型，如果类型不一样，则直接返回false**


- 逻辑运算符：&& || !
	- &&：与（短路，也就是第一个表达式为false，那就不进行第二个表达式的运算了）
	- || ：或（短路，第一个表达式为true，则不进行第二个表达式的运算了）
	- ！：非，它会自动进行类型转换
- 三元运算符： ？ ：


##### **其他类型转boolean（重要）**
- number：0或者NAN为假，非0为真
- string：除了空字符串（“”），其他都是true
- null和undefind：都是false，因为
- 对象：都是true

ps：可以这样理解，只要不是空的数据，那么就是true，只要是空的就为false

### 流程控制语句
- if···else···
- switch
	- 在java中，switch可以接收：char int short byte， 枚举(JDK1.5)，String(JDK1.7)
	- 在JS中，switch可以接收任意数据类型的值
- while
- do···while
- for


### js的一些特殊语法
- **语句以分号结尾，但是如果一行只有只有一条语句，分号可以省略，但是不建议省略**
- 标量的定义使用var关键字，也可以不使用
	- 用var：定义的是**`局部变量`**
	- 不用var：定义的是**`全局变量`**（不建议使用）





#### 语句
- alert() ： 弹出信息框
- document.write():打印输出到页面中，可以是html标记
- typeof()：输出变量类型
	- null使用typeof判断类型结果为Object，实际上是js最初的bug，但是被ECMAScript沿用了，现在null被认为是对象的占位符，从而解释了这一矛盾，从技术上来说它任然是原始值。




# 练习：99乘法表
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>99乘法表</title>

	<style>
		td {
			border: 1px solid;
		}
	</style>
	<script>
		document.write("<table>");
		for (var i = 1; i <= 9; i++) {
			document.write("<tr>");
			for(var j = 1; j <= i; j++) {
				document.write("<td>");
				document.write(i + "*" + j + "=" + i * j);
				document.write("</td>");
			}
			document.write("</tr>");
		};
		document.write("</table>");
	</script>
</head>
<body>
	
</body>
</html>
```