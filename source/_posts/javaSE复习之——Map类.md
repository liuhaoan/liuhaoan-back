---
title: javaSE复习之——Map类
categories: JavaSE 复习
copyright: true
date: 2019-04-10 10:54:56
tags:
- Map类
- linkedHashMap类
- TreeMap类
- hashtable和hashMap区别（面试题）
---
# map集合的概述
> 它是将**键**映射到**值**的对象，类似python中的字典，`它是无序的`。

<!--more-->

### 特点
> 1、一个map对象不能包含重复的键
> 
> 2、一个键只能映射到一个值
> 
> 3、map接口的实现分为hashMap和treeMap
> ps：只要是hash算法实现的集合，那么它都是无序的。
> 
> 4、map集合不能直接进行迭代。
> - **解决方法1（底层调用原map集合太多）**
> 利用keySet获取所有键的对象，然后迭代这个对象逐个get获取值，这样可以从侧面迭代map集合。
> ps：利用增强for循环可以更简便的拿到map集合中的每个值。
> 
> - **解决方法2（推荐使用）：**
> 利用entrySet方法获取一个键值对Entry对象，然后迭代或者增强for循环这个Entry对象然后逐个获取值即可。
> 
> **注意事项：**
> 传入引用数据类型时，必须重写hashCode和equals方法


### map和colllection的不同：
> 1、map是双列的，collection是单列的
> 
> 
> 2、map键唯一，collection只有它的子体系Set是唯一的
> **ps：**其实set集合是依赖与map的hash算法的，只是set集合中把map集合封装了一下，里面只使用了键，而值用object对象填充
>
> 
> 3、Map的数据结构只针对键有效，和值无关；collection的数据结构针对元素有效


### 创建map对象
```
map<String, Integer> map = new hashMap<>();
```

### map集合中的方法
- 添加方法：
	> .put(key, value)
	> 向map集合中添加一个键值对元素，新添加返回null，覆盖返回被覆盖的值
- 删除方法：
	> .clear()
	> 删除全部键值对元素
	> 
	> .remove(key)
	> 删除指定键对应的键值对
	> 
- 判断方法：
	> .containsKey(key)
	> 判断集合中是否包含指定的键
	> 
	> .containsValue(value)
	> 判断集合中是否包含指定的值
	> 
	> .isEmpty()
	> 判断集合是否为空
	> 
- 获取功能：
	> .entrySet()
	> 拿到map集合的键值对象，返回set<map.Entry<K,V>>
	> ps：Map.Entry是Map接口的内部接口，它实现了将键和值封装成了一个Entry对象，储存再Set集合中。
	> 
	> .get(key)
	> 根据键获取值 
	> 
	> .keySet()
	> 获取集合中所有键的集合，返回Set<K>
	> 
	> .values()
	> 获取集合中所有值的集合，返回Collection<V>
	> 
- 长度功能：
	> .size()
	> 返回键值对个数


### linkedHashMap特点
> 它是有序的，怎么存就怎么打印


### TreeMap特点：
> 1、可以用来排序，值是唯一的，等等
> 
> 2、传入引用数据类型时，必须重写compareTo方法，否则无法判断值的唯一性，会报错。
> 
> 3、具体笔记在[TreeSet集合](/2019/04/10/javaSE复习之——TreeSet类/)中介绍


### hashtable和hashMap区别（面试题）：
- 共同点：
> 1、底层都依赖hash算法
> 
> 2、都是双列集合


- 不同点：
> 1、HashMap是`线程不安全的`，效率高，jdk1.2版本出现的
> 
> 2、Hashtable是`线程安全的`，效率相对第，jdk1.0版本出现的
> 
> 3、HashMaop`可以`储存**null键**和**null值**
> 
> 4、Hashtable`不可以`储存**null键**和**null值**