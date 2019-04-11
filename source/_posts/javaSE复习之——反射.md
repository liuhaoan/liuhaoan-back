---
title: javaSE复习之——反射
categories: JavaSE 复习
copyright: true
date: 2019-04-11 09:33:17
tags:
- 动态代理
- 反射
- 动态代理底层原理
---
# 反射之——类的加载概述和加载时机
- 概述
	> 当程序要使用某个类的时候，如果该类字节码文件还未被加载到内存中，则系统会通过加载、连接、初始化三个步骤来对这个类进行初始化
	> 
	> 
	> - 加载
	> 就是将class文件读入内存中，并为之创建一个class对象，任何类被使用时系统都会建立一个class对象
	> 
	> 
	> - 连接：
	> 1、验证：是否有正确的内部结构，并和其他类协调一致
	> 2、准备：负责为类的静态成员分配内存，并且设置默认初始化值
	> 3、解析：将类的二进制数据中的 符号引用 替换为直接引用
	> 
	> 
	> - 初始化
	> 就是默认初始化、显示初始化、构造方法初始化等一系列初始化

<!--more-->

- 加载时机：
> 1、创建该类的实例
> 
> 2、访问该类的静态变量，或者为静态变量赋值
> 
> 3、调用该类的静态方法
> 
> 4、使用反射的方式来强制创建某个类或者接口对应的java.lang.Class对象
> 
> 5、初始化某个类的子类（父类构造方法 > 子类构造方法   编译看父类，运行看子类，也就是父类构造方法中访问某个方法，子类可以重写那个方法，让父类不调用自己的方法而调用子类重写的方法）
> 
> 6、直接使用java.exe的命令来运行某个主类（需要运行当然要把类加载到内存中喽）



# 反射之——类加载器的概述和分类
- 概述
	> 类接载其负责将.Class文件加载到内存中，并为之生成对应的Class对象，虽然我们不需要关心类的加载机制，但是了解这个机制能让我们更好的理解程序运行。

- 类加载器的分类：
> 1、Bootstrap ClassLoader	根类加载器
> - 作用
> 它也被称为引导类加载器，负责Java核心类的加载，比如System、String等，他们在JDK中LIB目录下的rt.jar文件中
> 
> 2、Extension ClassLoader	扩展类加载器
> - 作用
> 负责JRE扩展目录中jar包的加载，也就是JDK中JRE的lib目录下的ext目录
> 
> 3、System ClassLoader	系统类加载器
> - 作用
> 负责在jvm启动时加载来自Java 命令的class文件，以及classpath环境变量做指定的jar包和类路径


### 获取类字节码文件的三种方法
- Class.forName（”包名加类名“）
- 类名.class
- 对象的引用.getClass()


# 反射之——读取配置文件获取类名、变量、方法的名字，来加载相应的类、变量、方法（框架技术的基本）：
### Class中的方法
- Class.forName（）
	> 它可以实现动态加载类

- Class字节码文件的引用.newInstance（）
	> 使用这个类无参构造方法创建实例对象

- Class字节码文件的引用.getConstructor（有参构造传入数据类型的字节码，例如：int.class）
	> 返回一个 Constructor 对象，它反映此 Class 对象所表示的类的指定公共构造方法

- .getField(“变量名”)
	> 返回一个 Field 对象，它反映此 Class 对象所表示的类或接口的指定  公共  成员字段(也就是成员变量之类的，但只限公有)

- .getDeclaredField（“变量名”）
	> 返回一个 Field 对象，该对象反映此 Class 对象所表示的类或接口的指定  已声明  字段（只要声明就可以获取）。

- .getMethod（“方法名”， 代参数的参数类型字节码）
	> 返回一个 Method 对象，它反映此 Class 对象所表示的类或接口的指定  公共  成员   方法

- .getDeclaredMethod（“方法名”， 代参数的参数类型字节码）
	> 返回一个 Method 对象，它反映此 Class 对象所表示的类或接口的指定  已声明  成员  方法


### Constructor中的方法：
- Class字节码文件的引用.newInstance（需要传入有参构造的数据）
	> 创建一个对象有参构造的实例


### Field中的方法：
- .set（需要修改的  变量  所在的类的引用， 需要修改成的值）
- .setAccessible(true);
	> 让反射的对象在使用时应该取消 Java 语言访问检查


### Method中的方法：提供关于类或接口上单独某个方法（以及如何访问该方法）的信息
- .invoke(需要调用的  方法  所在的类的引用， 带参数的参数值)
	> 调用该方法





### 例子1（利用反射创建空参构造的对象）
```
	BufferedReader br = new BufferedReader(new FileReader("config.properties"));
	//读取配置文件中的类名

	Class clazz = Class.forName(br.readLine());
	//获取该类的字节码文件

	Fruit f = (Fruit) clazz.newInstance();
	//利用字节码文件创建实例对象

	j.run(f);
	//调用对象中的方法
```


### 例子2（创建有参构造的反射）
```
	Class clazz = Class.forName("com.heima.bean.Person");
	Constructor c = clazz.getConstructor(String.class,int.class);
	//获取有参构造

	Person p = (Person) c.newInstance("张三",23);
	//通过有参构造创建对象

	System.out.println(p);
```


### 例子3（通过反射获取成员变量，并且使用）
```
	Class clazz = Class.forName("com.heima.bean.Person");
	Constructor c = clazz.getConstructor(String.class,int.class);
	//获取有参构造

	Person p = (Person) c.newInstance("张三",23);
	//通过有参构造创建对象
	
	//Field f = clazz.getField("name");
	//获取姓名字段

	//f.set(p, "李四");
	//修改姓名的值

	Field f = clazz.getDeclaredField("name");
	//变量私有则暴力反射获取字段

	f.setAccessible(true);
	//去除私有权限

	f.set(p, "李四");	
	
	System.out.println(p);
```


### 例子4（通过反射写一个通用的工具类，来设置某个对象的 某个属性为指定的值）：
```
	//此方法可将obj对象中名为propertyName的属性的值设置为value。
	public void setProperty(Object obj, String propertyName, Object value) throws Exception {
		Class clazz = obj.getClass();
		//获取字节码对象

		Field f = clazz.getDeclaredField(propertyName);
		//暴力反射获取字段

		f.setAccessible(true);
		//去除权限

		f.set(obj, value);
	}
```


### 反射之——动态代理
```
//创建一个代理类，它其实就是一个代理工厂
public class MyInvocationHandler implements InvocationHandler {
	private Object target;

	public MyInvocationHandler(Object target) {
		this.target = target;
	}
	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		System.out.println("权限校验");
		method.invoke(target, args);
		//执行被代理target对象的方法

		System.out.println("日志记录");
		return null;
	}

}


//让代理工厂代理这个类
StudentImp si = new StudentImp();
MyInvocationHandler m = new MyInvocationHandler(si);
Student s = (Student)Proxy.newProxyInstance(si.getClass().getClassLoader(), si.getClass().getInterfaces(), m);

s.login();
s.submit();
```


- 底层原理（虽然底层不需要我们管，这个jdk自己会解决，但是理解这个原理对我们也有好处）：
	> - 原理
	> 当我们调用Proxy.newProxyInstance类时，会通过反射创建一个代理类的字节码并且返回它的实例，它实现了StudentImp实现的接口，并且继承Proxy，它的构造类传入了我们创建的实现了InvocationHandler接口的对象，并且在static静态初始化中把StudentImp实现的接口的各个方法的Method方法都初始化完成（其中包括equals、toString等方法），因为它实现了StudentImp实现的接口，并且重写的方法是直接调用我们传入的实现了InvocationHandler接口的对象中的invoke方法，所以我们调用案例中的login和submit方法可以实现动态代理