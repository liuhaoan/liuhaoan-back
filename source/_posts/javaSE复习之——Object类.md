---
title: javaSE复习之——Object类
categories: JavaSE 复习
copyright: true
date: 2019-04-09 15:19:43
tags:
- Object类
---
# Object类中的常用方法
- 类名.getClass()
	> 获取这个类对象的字节码
- 字节码名.getName()
	> 获取类的名称

- .equals(对象)
	> 判断`调用此方法的对象`和`传入对象`的值是否一样


- toString方法
	> 这是object里的方法，默认打印有@的内容(`其实是这个对象在堆内存中的地址值`)，因为`所有类都是默认继承Object类的`，所以重写它可以更好的显示属性值。
	> 
	> 注：直接打印输出某个对象的引用那么`系统默认`会直接调用`该对象`的toString显示属性值，如果该类`没有重写`toString方法，默认打印该类在`堆内存中的地址值`。

<!--more-->

# 重写toString代码示例：

```
		public Stirng toString() {
			return name + "," + age;
		}
```



# equals方法
- equals方法默认是比较`地址值`，然而每个对象的地址值肯定是不一样的，所以如果调用equals方法的对象`没有重写equals`，那么调用它是无意义的。

# 重写equals代码演示：

```
//重写equals方法
public boolean equals(Object obj) {
	Student  s = (Student)obj;
	return this.name.equals(s.name) &&this.age == s.age;	//这里的equals调用的是string里的方法
}
```



==号和equsls的区别（面试可能问道）：
	1、==号可以比较基本数据类型，也可以比较应用数据类型，比较基本数据类向的值时比较的是

数据值，比较引用数据类型比较的是地址的值
	2、equals只能比较引用数据类型，即比较地址的值，基层还是依赖==号，默认的equal方法没

有意义，但是我们可以重写它使其有意义。