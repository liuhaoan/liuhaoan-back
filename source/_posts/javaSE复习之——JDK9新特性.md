---
title: javaSE复习之——JDK9新特性
categories: JavaSE 复习
copyright: true
date: 2019-04-11 15:14:10
tags:
---
- list、set、map接口新增了一个方法“of”
	> - of作用
	> 可以给集合一次性添加多个元素
	> 
	> - 使用前提：
	> 当集合中的元素个数已经确定了，不在改变时使用
	> 
	> - 注意事项：
	> 1、of方法只适用于list、set、map接口，不适用于它的实现类，hashSet等
	> 2、of方法的返回值是一个不能改变的集合，集合不能再使用add、put方法添加元素
	> 3、set、map几口在调用of方法的时候，不能有重复的元素