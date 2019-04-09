---
title: javaSE复习之——Integer中的常见面试题
categories: JavaSE 复习
copyright: true
date: 2019-04-09 17:16:38
tags:
- Integer
- Integer面试题
- 面试题
---
# 代码示例

<!--more-->

```
package com.heima.wrapclass;


public class Demo5_Integer {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Integer i1 = new Integer(97);
		Integer i2 = new Integer(97);
		System.out.println(i1 == i2);
		//false

		System.out.println(i1.equals(i2));
		//true
		System.out.println("-----------");
	
		Integer i3 = new Integer(197);
		Integer i4 = new Integer(197);
		System.out.println(i3 == i4);
		//false

		System.out.println(i3.equals(i4));
		//true
		System.out.println("-----------");
	
		Integer i5 = 127;
		Integer i6 = 127;
		System.out.println(i5 == i6);
		//true

		System.out.println(i5.equals(i6));
		//true
		System.out.println("-----------");
	
		Integer i7 = 128;
		Integer i8 = 128;
		System.out.println(i7 == i8);
		System.out.println(i7.equals(i8));
		//true
		
		/*
		 * -128到127是byte的取值范围,如果在这个取值范围内,自动装箱就不会新创建对象,而是从常量池中获取
		 * 如果超过了byte取值范围就会再新创建对象
		 * 
		 * public static Integer valueOf(int i) {
		        assert IntegerCache.high >= 127;


			//i>= -128 && i <= 127
		        if (i >= IntegerCache.low && i <= IntegerCache.high)		
		            return IntegerCache.cache[i + (-IntegerCache.low)];
		        return new Integer(i);
		    }
		 */
	}

}
```
# 总结
- 底层代码可以理解成一个数组，这个数组索引0对应着-128、255对应着127，当传入的值在-128 - 127之间时自动装箱时会直接在这个`数组中取值`，进而`引用地址是一样的`，所以上面返回了true