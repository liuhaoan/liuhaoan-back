---
title: javaSE复习之——Properties集合
categories: JavaSE 复习
copyright: true
date: 2019-04-10 16:54:55
tags:
- Properties集合
- 配置文件
- hashtable和hashMap区别（面试题）
---
# Properties概述
> 它是一个双列集合，Properties的父类是HashTable类，它有一个固定的作用，那就是存储配置文件。
> 
> - ps:
> 虽然Hashtables被HashMap替代了，但是Hashtable有个争气的儿子——Properties

<!--more-->

### hashtable和hashMap区别（面试题）：
- 共同点：
	> 1、底层都依赖hash算法
	> 
	> 2、都是双列集合
- 不同点：
	> 1、HashMap是线程不安全的，效率高，jdk1.2版本出现的
	> 
	> 2、Hashtable是线程安全的，效率相对低，jdk1.0版本出现的
	> 
	> 3、HashMap可以储存null键和null值
	> 
	> 4、Hashtable不可以储存null键和null值


### Properties的特殊方法
- .setProperty(key, value)
	> 设置键和对应的值
- .getProperty(key)
	> 根据键获取相对应的值，返回String
- .propertyNames()
	> 返回集合中所有键的Enumeration枚举
- .load(InputStream)	
	> 从配置文件读取配置项到集合中
- .store(OutputStream)


### 遍历所有配置案例
```
		Properties prop = new Properties();
		prop.setProperty("name", "张三");
		prop.setProperty("tel", "18912345678");
		
		//System.out.println(prop);
		Enumeration<String> en = (Enumeration<String>) prop.propertyNames();
		while(en.hasMoreElements()) {
			String key = en.nextElement();
			//获取Properties中的每一个键

			String value = prop.getProperty(key);
			//根据键获取值
			System.out.println(key + "="+ value);
		}
```

### load与storte案例演示
- load读

```
	Properties prop = new Properties();
	prop.load(new FileInputStream("config.properties"));
	//将文件上的键值对读取到集合中
```

- store写

```
	prop.setProperty("tel", "18912345678");
	//先修改集合中的配置

	prop.store(new FileOutputStream("config.properties"), null);
	//第二个参数是对列表参数的描述,可以给值,也可以给null

```