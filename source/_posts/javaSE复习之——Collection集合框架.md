---
title: javaSE复习之——Collection集合框架
categories: JavaSE 复习
copyright: true
date: 2019-04-09 20:54:50
tags:
- Collection集合
- 集合
---
# 集合与数值的区别
> 1、数组即可以存`基本数据类型`也可以存`引用数据类型`(对象)
> 
> 2、集合只能存`引用数据类型`，如果存基本数据类型，那么系统会`自动装箱成对象`。
> 
> 3、数组的长度是`固定`的，不能自动增长
> 
> 4、集合的长度是`可变`的。

<!--more-->

# 集合与数组的缺点
- 数组：
	> 长度是固定的，不能自动增加
- 集合：
	> 会浪费很多空间，
	> 
	> 原因：它的部分底层是数组，它增加长度的方法是首先创建长度为10的数组，然后不够就1.5倍增加，直到够存下为止。

# Collection集合的继承体系图:

```
                                                       Collection
                                    单列集合的根接口,它是抽象类，一般用来父类引用子类对象
                                     /                                   \
                                    /                                     \   
                                   /                                       \
                                 List                                      Set
                         有序，有索引，可重复储存                    无序，无索引，不可重复储存（我们只要学习如何保证元素不是重复的）
                          /        |        \                         /          \
                         /         |         \                       /            \
                        /          |          \                     /              \
               ArrayList       LinkedList      Vector              HashSet          TreeSet
           查改快(直接索引查找)  查改慢(要遍历)    查改略慢               
          增删慢(考虑增容、拷贝)   增删快          增删慢
                线程不安全       线程安全        线程安全
                数组实现         链表实现        数组实现

```


# Collection集合的方法
- .add()
	> 向集合中存入数据，list集合返回true，Set集合如果集合有相同的数据返回false，否则true。
- .remove()
	> 删除
- .toArray()
	> 把集合转换成数组输出，如果ArrayList对象加了泛型，那么可以传入某类型数组对象，然后用某类型数组直接引用。
- .addAll()
	> 把传入集合加入到调用的集合中
- .removeAll()
	> 删除调用集合中与传入集合交集的数据
- .containsAll()
	> 判断调用集合中是否有传入集合的数据
- .retainAll()
	> 取两个集合的交集，如果传入类有交集那么会把那两个值覆盖调用集合的值，调用的集合改变了就返回true，否则false


# List集合方法：
- .add(int index,)
	> 在某个索引添加指定数据
- .remove(int index,)
	> 在某个索引删除指定数据，删除了什么就返回什么。一个小问题：remove不会自动装箱，可能会识别错误导致程序出错
- .get(int index,)
	> 输出索引对应的数据，所以list可以直接用这个方法遍历数组，不用迭代了。	
- .set(int index,)
	> 设置指定索引的数据

ps：集合`containsAll、removeAll`等方法底层都是基于`equals`方法的，所以在集合中处理对象时，`传入对象`需要重写object父类的equals方法才能实现效果。


# 集合迭代的概述：
> 集合是存储元素，而这些元素需要查看，那么就需要用到迭代，迭代也就是遍历。

### 迭代使用示例：
```
Collection c = new ArrayList();
Iterator it = c.iterator();

//.hasNext()判断是否还有数据
While(it.hasNext())
{
	System.out.println(it.next());
	//.next()获取下一个数据
}
```


### 迭代器`修改数据`产生的异常与解决方案：
- 异常：
	> 在利用迭代器遍历数据时，如果我们在遍历的中途给集合添加数据，那么会出现异常
- 异常原因：
	> 在创建iterator迭代器时已经把集合的数量给了迭代器，如果中途给集合添加数据就是并发修改了。
- 解决方法：
	> 使用iterator这个`list独有`的迭代器，然后调用`Itterator自己`的add添加数据。 


# Vector的概述
> jdk刚出来他就有了，在`jdk1.2`版本加入了collection体系，后来因为vector有的功能ArrayList都有，而且还比他强大，所以不用vector了。

### Vector与ArrayList的区别
> Vector是`线程安全`的，它的`效率相对低`也就是查询相对慢；
> 
> 反之ArrayList它是`线程不安全`的，但是`效率高`。


# LinkedList集合的概述
> 使用链表实现的list集合。

### `数组`实现集合与`链表`实现集合的优缺点：
- 数组：
	> 查询修改快，但是增删慢
- 链表：
	> 查询修改慢，但是增删快

# 集合的面试题——之ArrayList、Vector、linkedList区别：
- ArrayList：
	> 数组实现，查询修改快，但是增删慢，它是线程不安全的。
- LinkedList：
	> 链表实现，查询修改慢，但是增删快，它是线程不安全的。
- Vector：
	> 数组实现，相对ArrayList查询慢效率低，因为它是线程安全的。

### 他们三个的用法：
> 1、查询多用ArrayList
> 2、增删多用LinkedList
> 3、增删查询都多用ArrayList
> 4、Vector面试的时候用，虽然它是线程安全的，但是在需要线程安全的时候也不用它。

### LinkedList的特殊方法
- .addFirst()  与  .addLast()
	> 在链表头部与尾部添加数据
- .getFirst  与  .getLast()
	> 获取链表头部或者尾部数据
- .removeFirst  与  .removeLast()
	> 删除链表头部或者尾部数据
- .get()	
	> 获取链表指定位置的数据