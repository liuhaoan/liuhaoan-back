---
title: javaSE复习之——Arrays类
categories: JavaSE 复习
copyright: true
date: 2019-04-09 16:51:02
tags:
- Arrays类
---
# Arrays类的概述
> 它其实就是一个数组的工具类，提供各种关于数组的操作


<!--more-->

# Arrats的方法：
- .toString()
	> 数组转换为字符串
- .sort()
	> 数组排序
- .binarySearch()
	> 二分查找，`返回索引值`，如果没找到就返回，`被查找数据在数组中应该出现的插入点的负数 减去1`
	> 
	> 前提：这个数组是一个序列数组
- .asList()
	> 把数组转换成集合，用List引用。
	> 例子：
	> ```
	List<String> l = Arrays.asList(数组);```
	
- 数组转集合的意义：
	> 
	> 虽然从`数组转换成的集合`不能增加和减少，但是我们可以用集合的思想来操作数组，也就是用集合除add、remove以外的方法。