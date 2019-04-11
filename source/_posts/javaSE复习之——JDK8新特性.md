---
title: javaSE复习之——JDK8新特性
categories: JavaSE 复习
copyright: true
date: 2019-04-11 14:46:00
tags:
- JDK8新特性
- 函数式编程
- 函数式接口
---
# JDK8新特性总汇
- Lambda表达式和函数式接口
> Lambda表达式（也称为闭包）是Java 8中最大和最令人期待的语言改变。它允许我们将函数当成参数传递给某个方法，或者把代码本身当作数据处理


- 接口的默认方法和静态方法
> 默认方法和抽象方法之间的区别在于抽象方法需要实现，而默认方法不需要。接口提供的默认方法会被接口的实现类继承或者覆写

<!--more-->

- 方法引用


- 重复注解
> 自从Java 5中引入注解以来，这个特性开始变得非常流行，并在各个框架和项目中被广泛使用。不过，注解有一个很大的限制是：在同一个地方不能多次使用同一个注解。Java 8打破了这个限制，引入了重复注解的概念，允许在同一个地方多次使用同一个注解


- 更好的类型推断
> 就是创建有泛型类的对象时，后面不用写类型


- 拓宽注解的应用场景
> Java 8拓宽了注解的应用场景。现在，注解几乎可以使用在任何元素上：局部变量、接口类型、超类和接口实现类，甚至可以用在函数的异常定义上。


- Stream流
> 说到Stream便容易想到I/O Stream，而实际上，谁规定“流”一定是“IO流”呢？
> 
> 在Java 8中，得益于Lambda所带来的的函数式编程，引入了一个**全新的Stream概念**，用于解决已有集合类库所有的弊端


# 在接口中可以定义有方法体的方法，如果是非静态的，必须使用default，如果是静态的就不用了


- 例子：
```
	interface Inter {
		public default void print（） {
			System.out.println("hello")
		}

		public static void method() {
			System.out.print("static Method")
		}
	}
```


# 在局部内部类中使用内部类以外的变量时，那个变量可以不用final修饰，他在jdk1.8版本之前是一定要用final修饰的
- ps：
	> 其实这就是一个语法糖，底层它还是用final修饰了的

- 为什么需要使用final修饰？
	> 答：
	> 
	> 因为不用final修饰可能出现数据不一致的问题，如果内部类或者外部类修改了这个变量的值，那么对方是不可能知道的，所以造成了数据不一致的问题。
	> ps：底层详情参考[javaSE复习之——面向对象_内部类](/2019/04/08/javaSE复习之——面向对象-内部类/)
	> 
	> 数据不一致问题的解决方法就是直接给变量修饰一个final，这就是为什么匿名内部类访问外部类中的变量时，这个变量一定要final修饰的原因

# 函数式 接口 的概述
> `它有且只有一个抽象方法的接口`，它适用于函数式编程，也就是函数式接口就是适用于lambda使用的接口，只有确保接口中有且只有一个抽象方法，java中的lambda才能顺利的推导




# 函数式 编程 的概述
> 就是使用lambda编程

- PS：
	> “语法糖”是指使用更加方便，但是原理不变的代码语法。例如遍历集合时使用的for-each语法，其实底层实现原理是迭代器，这就是“语法糖”。从应用层面来讲，java中的Lambda可以被当做是匿名内部类的“语法糖”，**但是二者在原理上是不同的**





### 函数式接口的定义：
```
	修饰符 interface 接口名称 {
		public abstract 返回值类型 方法名称 （可选参数信息）；
		//其他非抽象方法内容
	}
```
ps：接口中的抽象方法的 public abstract 是可以省略的





### 函数式接口的特点：
- 它有且只有一个抽象方法的 接口
- 函数式接口可以包含其他的方法，
- 
- 比如
	> 默认、静态、私有



### 正如我们所知，接口中可以定义多个抽象方法，而我们的函数式编程只能有一个抽象方法，那么如何确保某个接口中只有一个抽象方法呢？

- 答
	> 使用@FunctionalInterface注解，它的作用是检测接口是否是一个函数式接口
	> - 是
	> 编译成功
	> 
	> - 否
	> 编译失败
	> 1、接口中没有抽象方法
	> 2、抽象方法有多个




### 函数式接口的使用
- 作为方法的参数 和 返回值类型
	- 例子：
		- 作为参数：
		```
				//定义一个方法，参数使用函数式接口
				public static void show（MyInterface myInterface）{
					myInterface.method();
				}
				//main方法中调用：其实它重写了method方法，结果是打印hello
				show(() -> Sysytem.out.println("hello"))```
		- 作为返回值类型：
		> 如果返回值类型是函数式接口，那么我们可以返回匿名内部类，当然也可以返回一个lambda
				
				



### 常用的函数式接口（使用方法同理）

#### Supplier接口
> 它包含一个无参的方法，T get（）。用来获取一个泛型参数指定类型的数据对象，它被称之为生产型接口，指定接口的泛型是什么类型，那么接口中的get方法就会产生一个什么类型的数据
> - 例子：
> ```
		//定义一个类
		public String getString(Supplier<String> sup) {
			return sup.get()
		}

		//调用
		String s = getString(() -> "Hello")```




#### Consumer接口：
> Consumer接口正好与Supplier接口相反，它不是产生一个数据，而是消费一个数据，数据类型由泛型决定，它的抽象方法中有一个 void accept（T，t）意为消费一个指定泛型的数据



- Consumer接口和Supplier接口的区别：
	> 1、Consumer是消费
	> 2、Supplier是生产
	

- 什么是消费和生产：
	- 消费：
		> 我们传入一个变量供accept方法使用
	- 生产：
		> 我们利用lambda重写get方法，然后获取一个自己想要的值



- 默认方法：andThen
	- 作用：
		> 需要两个Consumer接口，可以吧两个Consumer接口组合到一起，再对数据进行消费
		> 
		> 例如：
		> 我们要把s变量消费两次，这样写代码就重复了
		```
			Consumer<String> con1
			Consumer<String> con2
			String s = "hello";
			con1.accept(s);
			con2.accept(s);```

		> 我们可以这样（下面这段语句和上面是一样的效果）：
		```
				con1.andThen(con2).accept(s);```

		> **ps：这样就实现了组合消费**
		> **注意：谁写在前面谁先消费**


#### **Predicate接口：**
> 我们有时候需要对某种数据类型的数据进行判断，从而得到一个Boolean值得结果，我们就可以用到Predicate接口

- Predicate接口中的方法：
	- 抽象方法：**test**
		> 用于条件判断
	- 默认方法：**and（&&与）**
		> 可以连接多个判断条件

	- 默认方法：**or（或）**
		> 可以连接多个判断条件

	- 默认方法：**negate（非，取反）**
		> 可以连接多个判断条件
- 例子：
```
public static boolean checkString(String s, Predicate<String> pre1,Predicate<String> pre2){
    return pre1.and(pre2).test(s);
//等价于return pre1.test(s) && pre2.test(s);
}```



#### **Function接口：**
> 根据一个类型的数据，得到另一个类型的数据，前者为前置条件，后者为后置条件

- Function接口中的方法：
	- 抽象方法：**R apply（T t）**
		> 根据类型T的参数获取类型R的结果，返回一个R类型数据

	- 默认方法：**andThen**
		> 用来进行组合操作，不过它与Consumer接口中的方法区别是，它执行完主方法后，可以把主方法中的的结果传给副方法

	- 比如：**fun1.andThen(fun2).apply(s)**
		> 其中s是String类型，fun1是把String转int，fun2是int转String

	- 实例：
	```
class Change {
    public String change(String s, Function<String, Integer> fun1, Function<Integer, String> fun2) {
        return fun1.andThen(fun2).apply(s);
	}
}```

- main方法调用：
```
	String str = new Change().change("100", s -> Integer.parseInt(s) + 10, integer -> integer + "");
	System.out.println(str);```