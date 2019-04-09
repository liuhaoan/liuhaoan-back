---
title: javaSE复习之——BigInteger与BigDecimal类
categories: JavaSE 复习
copyright: true
date: 2019-04-09 20:34:20
tags:
- BigInteger类
- BigDecimal类
---
# BigInteger的概述
> `不可变`的任意精度的整数。所有操作中，都以`二进制补码`形式表示 BigInteger（如 Java 的基本整数类型）。
> 
> BigInteger 提供所有 Java 的`基本整数操作符`的对应物，并提供 java.lang.Math 的`所有相关方法`。
> 
> 另外，BigInteger 还提供以下运算：
> 模算术、GCD 计算、质数测试、素数生成、位操作以及一些其他操作。 

<!--more-->

ps：了解一下BigInteger类可以存下任意长度的数值就行了。

#### 与BigInteger不同的是，BigDecimal是小数

####注意事项：
> 开发中创建BigDecimal对象进行运算时，给它有参构造传入的值要以字符串形式传入，如果以`数值形式`传入的话会`损失精度`。
