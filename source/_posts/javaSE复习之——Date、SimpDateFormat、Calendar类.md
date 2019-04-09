---
title: javaSE复习之——Date、SimpDateFormat、Calendar类
categories: JavaSE 复习
copyright: true
date: 2019-04-09 20:41:36
tags:
- Date类
- SimpDateFormat类
- Calendar类
---
# Date的概述
> 获取瞬间时间，精确到毫秒。

- 例子：

```
Date d = new Date();
//打印d会显示打印时瞬间的电脑系统时间

Date d = new Date(0)
//这样会打印1970年1月1日的8点
```

<!--more-->

- 解析：
	> 1、为什么是1970年1月1日：
	> 首先1970年1月1日是`c语言`和`UNLX`的生日，然后因为最早的计算机是32位的，`32位最多表示的时间是68年`，而最早出现的UNLX系统考虑到计算机产生的年代和应用的时限，所以综合取了`1970年1月1日`为UNLX 的纪元时间开始。
	> 
	> 2、为什么是8点：
	> 因为我们电脑的时区是东8区，所以显示的是8点。


### Date的方法
- .getTime()	
	> 通过时间对象获取毫秒值
- .setTime()	
	> 设置毫秒值，设置1000那么输出时间对象的时间为：`1970年1月1日8点钟多一秒`。



# SimpDateFormat的概述
> 1、它是`DateFormat`的子类，拥有DateFormat的所有功能。
> 
> 2、DateFormat 是日期/时间格式化子类的抽象类
> 
> 3、SimpleDateFormat 是一个以与`语言环境`有关的方式来`格式化`和`解析日期`的具体类。它允许进行格式化`（日期 -> 文本）`、解析`（文本 -> 日期）`和规范化。 
总的来说，它们就是一个`日期格式化类`，构造方法传入格式规则可以按照相应的规则格式化日期。



### 方法
- .format(Date d)
	> 把日期类转换为String类
- .parse(String str)
	> 把时间字符串转换成日期对象，需要配合异常使用。

### SimpleDateFormat类的实例
```
Date d = new Date(0);
//获取当前瞬间时间

SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
//创建日期格式化类并且进行格式化

System.out.println(sdf.format(d));
//格式化并且输出时间，结果为：1970年
```


# Calendar类的概述
> 它把K的很多方法都替代掉了，Calendar 类是一个抽象类，它为特定瞬间与一组诸如 `YEAR、MONTH、DAY_OF_MONTH、HOUR 等` 日历字段之间的转换提供了一些方法，并为操作日历字段（例如获得下星期的日期）提供了一些方法。


### 方法：
- .getInstance()	
	> 获得一个日历，并且是基于当前时间的，返回一个Calendar的子类，可以父类引用子类对象
	> 
- .get(int field)
	> 返回指定日历字段的值，日历字段代表年月日那些，比如1那么就表示年，不过为了方便，Calendar给出了`字段常量`，比如Calendar.YEAR常量它的值是1，代表了年。
- .add(int field,int i1)	
	> 指定字段的值加减，当前年为2018
	> 
	> 例当前年为2018：add(Calendar.YEAR，-1)
	> 那么返回2017
- .set(int year,int month,int day)
	> 修改指定字段,可以直接修改年月日，也可以像add那样修改年等。


### 代码示例：
```
//获取今天年月日和星期
Calendar c = Calendar.getInstance();

//获取一个日历
System.out.println(c.get(Calendar.YEAR) + "年" + c.get(Calendar.MONTH) + 1 + "月" 
+ c.get(Calendar.DAY_OF_MONTH) + "日\n星期" + (c.get(Calendar.DAY_OF_WEEK) - 1));

```