---
title: javaSE复习之——Random类
categories: JavaSE 复习
copyright: true
date: 2019-04-09 20:21:11
tags:
- Random类
---
# Random概述
- 利用传入的随机数种子，生成一个伪随机数


# Random类的方法
- .nextInt(Int i);
	> 生成一个从0到i的随机数，包括0不包括i

# 例子
```
Random r = new Random();
//不输入种子的话系统自动使用纳秒来当作种子

r.nextInt(100);
//生成了0到100的随机数，不包括100

//ps：如果要生成1-100的随机数，直接+1
```