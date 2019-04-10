---
title: javaSE复习之——Collections工具类与集合总结
categories: JavaSE 复习
copyright: true
date: 2019-04-10 11:18:32
tags:
- 集合总结
- Collections工具类
- 面试题之——TreeSet或者TreeMap有几种排序方式和区别
---
# Collections中的常用方法
- Collections.sort(list)
> 把集合进行排序

- Collections.banarySearch(list, 需要查的元素)
> 用二分查找法查询某个集合中的元素，二分查找法前提是集合是有序的，找不到返回-(插入点 - 1）

- Collections.max(list)
> 根据默认排序返回集合中最大的元素


<!--more-->


- Collections.min(list)
> 根据默认排序返回集合中最小的元素

- Collections.reverse(list)
> 反转集合

- Collections.shuffle(list)
> 随机置换，可以洗牌。



# 集合总结
- Collection
	- List(存取有序,有索引,可以重复)
		- ArrayList
		> 底层是数组实现的,线程不安全,查找和修改快,增和删比较慢
		- LinkedList
		> 底层是链表实现的,线程不安全,增和删比较快,查找和修改比较慢
		- Vector
		> 底层是数组实现的,线程安全的,无论增删改查都慢
		> 
		> 
		> 如果查找和修改多,用ArrayList
		> 如果增和删多,用LinkedList
		> 如果都多,用ArrayList

	- Set(存取无序,无索引,不可以重复)
		- HashSet
			> 底层是哈希算法实现
 			- LinkedHashSet
	 			> 底层是链表实现,但是也是可以保证元素唯一,和HashSet原理一样
		- TreeSet
			> 底层是二叉树算法实现
			> 
			> 一般在开发的时候`不需要对存储的元素排序`,所以在开发的时候大多用`HashSet,HashSet`的效率比较高
			> 
			> TreeSet在`面试的时候`比较多,问你有几种排序方式,和几种排序方式的区别




- Map
	- HashMap
		> 底层是哈希算法,针对键
 		- LinkedHashMap
	 		> 底层是链表,针对键
	- TreeMap
		> 底层是二叉树算法,针对键


**ps：开发中用HashMap比较多**

# 面试题之——TreeSet或者TreeMap有`几种排序方式`和`区别`
### TreeSet或者TreeMap排序的两种方式
- 第一种
	> 构造TreeSet集合什么都不传，就默认使用类中的Comparable的顺序，也就是compareTo方法。（传入集合的自定义对象实现了Comparable接口则用自定义类中重写的compareTo方法）

- 第二种
	> 构造TreeSet集合传入Comparator比较器，那么优先按照比较器顺序排序。

引用自[javaSE复习之——TreeSet类](/2019/04/10/javaSE复习之——TreeSet类/)

- ps：
	> 1、在开发中，`单列集合存储重复元素优先考虑ArrayList`，`不重复的元素优先考虑HashSet`，`双列集合直接考虑HashMap` 
	> 
	> 2、单列集合（collection）中Set集合类型其实底层都依赖map集合，它封装了map集合，当中只使用到了key，而value用固定的值替代(Object对象)。
	> 
	> 3、tree类型的map和set集合平时都不常用，但是**`面试会用`**，一般问你有**`几种排序方式`**,和**`几种排序方式的区别`**