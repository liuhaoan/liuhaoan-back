---
title: javaSE复习之——JDK8新特性_Stream流_方法引用
categories: JavaSE 复习
copyright: true
date: 2019-04-11 17:12:04
tags:
- Stream流方法引用
- Stream流
---
# 方法引用
> 它主要是对Lambda表达式的一种优化，在我们使用Lambda表达式的时候，我们实际上传递进去的代码是一种解决方案，比如拿什么参数做什么。
> 
> 但是有一种情况：
> 如果我们在Lambda中所使用的一种方案，在其他地方已经存在相同的方案，那么我们还需要再写重复的逻辑了嘛？？？

#### 举个例子
> 我们创建一个函数式接口，这个接口专门打印字符串，那么我们使用Lambda时需要的代码量就比较多
#### 代码示例（反例）

```
//这里创建一个函数式接口
@FunctionalInterface
public interface Printable {
	void print(String str);
}


public class Demo01PrintSimple {
	//一个静态方法，传入的参数是一个接口
	private static void printString(Printable data) {
		data.print("Hello, World!");
	}

	//使用Lambda表达式，实现打印字符串
	public static void main(String[] args) {
		printString(s ‐> System.out.println(s));
	}
}
```

#### 使用Lambda中的方法引用优化上例的代码
```
public class Demo02PrintRef {
	private static void printString(Printable data) {
		data.print("Hello, World!");
	}

	public static void main(String[] args) {
		printString(System.out::println);
		//因为系统自带了就有打印字符串的实现，所以我们可以不需要使用Lambda去写功能的实现，而是直接调用已经实现好的。
	}
}

```

#### 方法引用符：“：：”
> 双冒号`：：`为引用运算符，它所在的表达式被称为**`方法引用`**。如果Lambda要表达的函数方案已经存在于某个方法的实现中，我们就可以通过双冒号来引用该方法作为Lambda的代替者

#### 上面两个案列的`语义分析`
- **`s -> System.out.println(s)`**
	> 拿到参数后经过Lambda，传递给System.out.println方法处理

- **`System.out::println`**
	> 直接让System.out中的println方法来取代Lambda


#### 使用**对象的引用名**来引用成员方法
- 首先我们有一个接口

```
@FunctionalInterface
public interface Printable {
	void print(String str);
}

```

- 然后我们有一个实现功能的类

```
public class MethodRefObject {
	public void printUpperCase(String str) {
		System.out.println(str.toUpperCase());
	}
}
```

- 当我们使用lambda，并且在Lambda中具体实现功能时，需要创建MethodRefObject类时，我们可以直接先创建类，然后直接引用它

```
public class Demo04MethodRef {
	private static void printString(Printable lambda) {
		lambda.print("Hello");
	}
	public static void main(String[] args) {
		MethodRefObject obj = new MethodRefObject();
		printString(obj::printUpperCase);
		//我们不需要在Lambda中创建类，然后调用，我们直接引用它即可
	}
}
```