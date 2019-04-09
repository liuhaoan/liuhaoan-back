---
title: javaSE复习之——System类
categories: JavaSE 复习
copyright: true
date: 2019-04-09 20:23:18
tags:
- System类
---
# System类的概述
> System类有`标准输入`、`标准输出`和`错误输出`流；
> 
> 对外部定义的属性和环境变量的访问；加载文件和库的方法；
> 
> 还有快速复制数组的一部分的实用方法。

<!--more-->

# 字段：
> err
> 标准错误流
> 
> in
> 标准输入流
> 
> out
> 标准输出流


# System类的方法
- .gc()
	> 运行垃圾收集器，虽然objcket类中有一个`filalize`的方法会自动清理垃圾，但是垃圾没有`超过一个量`是不会自动收集的。
- .exit()
	> 退出java虚拟机jvm，传入值为0是正常终止，非0为异常终止。
- .currentTimeMillis()
	> 返回当前时间与协调世界时 `1970 年 1 月 1 日午夜`之间的时间差（以毫秒为单位测量）。
	>
	> ps：经常应用在`计算程序运行时间`，从程序开始记录一次，结束记录一次，然后减去即可。


- .arraycopy(Object src, int srcPos, Object dest, int destPos, int length) 
	> 从指定源数组中复制一个数组，复制从指定的位置开始，到目标数组的指定位置结束。
	> 
	> 参数：
	> src - 源数组。
	> srcPos - 源数组中的起始位置。
	> dest - 目标数组。
	> destPos - 目标数据中的起始位置。
	> length - 要复制的数组元素的数量。