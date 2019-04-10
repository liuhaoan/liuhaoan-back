---
title: javaSE复习之——IO流_文件字节流
categories: JavaSE 复习
copyright: true
date: 2019-04-10 15:14:55
tags:
- IO流
- 文件字节流
- 标准异常处理代码（面试会用到，背都要背下来）
---
# FileInputStream概述
> 它是一个输入流，它的作用是从文件系统中的某个文件中获得输入字节，它是`InputStream`的子类

### 创建一个文件输入流
```
FileInputStream fis = new FileInputStream("1.txt");
//其实就是创建一个流的对象，不用了关闭即可
```
<!--more-->

### IO文件输入流的方法
- .read()
	> 从输入流读取下一个字节返回这个字节的int值，文件结束标记是-1，也就是读到-1就读完这个文件了。
- .read(arr)	
	> 从输入流读取字节存到arr数组中，也就是内存中，返回读取到的字节数
- .available()
	> 获取可以读的剩余字节数




### 为什么`read（）`方法读取一个字节返回的是int而不是字节类型的byte？
- 解答：
	> 一个字节等于8个二进制位，也就是`-1的二进制位补码是1111 1111`，然后文件的底层都是以二进制形式存储的，这些文件的二进制中难免中途会遇到某个字节是1111 1111（八个一），如果read方法直接返回byte的话那么遇到这种情况就直接停止读取文件了，为了解决这个问题就直接返回int而不直接返回byte，因为在Java中一个int数据占4个字节，`也就是占32个二进制位`，而read方法中从文件读取一个字节就在其`二进制位前面加上24个0让其组成一个int类型数据返回`，这样就返回了一个255而不是返回1了，这样就可以保证数据的完整，而文件结束标记的-1它本身就是整数型所以不会受到影响。当然在使用输出流输出文件时write方法会`自动去除int前面的24个零`。





# FileOutputStream的概述
> 它是一个输出流，它的作用将指定字节写入此文件输出流，它是OutputStream的子类

### 输出流注意事项
> 1、输入流指定的文件不存在会报错，而输出流却不会，它是直接创建这个文件
> 
> 2、虽然写出的是一个int类型的数据，但其实write方法会自动去除int数据的前3个8位2进制位
> 
> 3、如果文件存在，那么就会先将文件内容清空，如果不要让他清空要追加，那么就在创建对象时第二个参数传入一个true
> - 例子：
> ```
 FileOutputStream fos = new FileOutputStream("1.txt", true);```

### IO文件输出流的方法
- .write()
	> 将指定字节写入此文件输出流
- .write(arr)
	> 将arr数组中的字节写到文件中
- .write(arr, off, len)
	> off为数组起始偏移量，也就是起始索引，通常0、len就是要写入数据的总长度	



### 利用IO流进行文件拷贝例程之——`缓冲区拷贝`（单纯拷贝时推荐，中间需要对数据进行处理则使用带Buffered的封装类）
```
		FileInputStream fis = new FileInputStream("致青春.mp3");
		//创建输入流对象,关联致青春.mp3

		FileOutputStream fos = new FileOutputStream("copy.mp3");
		//创建输出流对象,关联copy.mp3

		//int len = fis.available();
		//System.out.println(len);
		
		byte[] arr = new byte[fis.available()];
		//创建与文件一样大小的字节数组

		fis.read(arr);
		//将文件上的字节读取到内存中

		fos.write(arr);
		//将字节数组中的字节数据写到文件上
		
		fis.close();
		fos.close();
```
ps：不推荐使用，因为一次性把所有字节都读下来放在内存中会导致占用内存过多，如果操作的是一个蓝光电影，就会`内存溢出`。


- 解决方法：
	> 一次处理一部分数据，分批次处理即可，代码如下

```
        byte b[] = new byte[8192];
		//缓冲区一定要为1024的整数倍

        int len;
        while ((len = fis.read(b)) != -1) {
            fos.write(b, 0, len);
        }
```




### 利用IO流进行文件拷贝例程二之——`普通拷贝`
```
		FileInputStream fis = new FileInputStream("致青春.mp3");
		//创建输入流对象,关联致青春.mp3

		FileOutputStream fos = new FileOutputStream("copy.mp3");
		//创建输出流对象,关联copy.mp3
		
		int b;
		//在不断的读取每一个字节
		while((b = fis.read()) != -1) {
			fos.write(b);
			//将每一个字节写出
		}
		
		fis.close();
		//关流释放资源
		fos.close();
```
ps：他有个缺点，那就是效率非常的慢，因为需要一个字节一个字节的读然后写。



### 利用IO流进行文件拷贝例程三之——`BufferedInputStream和BufferOutputStream拷贝`

> 字节流一次读写一个数组的速度明显比一次读写一个字节的速度快很多，
> 这是加入了数组这样的缓冲区效果，java本身在设计的时候，
> 也考虑到了这样的设计思想(装饰设计模式后面讲解)，所以提供了字节缓冲区流


- BufferedInputStream
	> BufferedInputStream内置了一个缓冲区(数组)
	> 从`BufferedInputStream`中读取一个字节时
	> `BufferedInputStream`会一次性从文件中读取8192个, 存在缓冲区中
	> 程序再次读取时, 就不用找文件了, 直接从缓冲区中获取
	> 直到缓冲区中所有的都被使用过, 才重新从文件中读取8192个
- BufferedOutputStream
	> `BufferedOutputStream`也内置了一个缓冲区(数组)
	> 程序向流中写出字节时, 不会直接写到文件, 先写到缓冲区中
	> 直到缓冲区写满, BufferedOutputStream才会把缓冲区中的数据一次性写到文件里

```
		FileInputStream fis = new FileInputStream("致青春.mp3");
		//创建文件输入流对象,关联致青春.mp3

		BufferedInputStream bis = new BufferedInputStream(fis);
		//创建缓冲区对fis装饰

		FileOutputStream fos = new FileOutputStream("copy.mp3");
		//创建输出流对象,关联copy.mp3

		BufferedOutputStream bos = new BufferedOutputStream(fos);
		//创建缓冲区对fos装饰
		
		int b;
		while((b = bis.read()) != -1) {
			bos.write(b);
		}
		
		bis.close();
		//只关装饰后的对象即可
		bos.close();

```

### flush和close的区别
> 1、flush只是刷新缓冲区，后面还可以写（默认缓冲区存满放到文件，为了拷贝文件的完整性，拷贝完之后一定要刷新缓冲区，缓冲区也就是那个数组）
	> - ps：
	> 一般用带Buffered的IO文件流才用的到，自己创建缓冲区每次都存到文件里去了。

> 2、close是关闭流，不过在关闭流之前会刷新一便缓冲区，关闭后不能写。


### 使用`jdk封装好的带Buffered的字节流类`与`手动创建字节缓冲区`**效率**的区别
> 1、带Buffered的封装类实现文件复制会有`两个缓冲区`
> ps:BufferedReader是先将数据抓取到`内存的缓冲区`再`从缓冲区中读取字节或数组`，操作的是Buffer里的数据（非底层硬盘的数据）
> 
> 2、自己手动创建缓冲区的话有`一个缓冲区就能实现文件复制`
> 
> 3、但是两个缓冲区都是再`内存中`的，所以他们之间的赋值对效率`不会有很大影响`
> 
> 4、得出结论：手动创建缓冲区比Buffered封装类效率`相对高一点点`


### **1.6版本和之前流的标准异常处理代码（面试会用到，背都要背下来）**
* try finally嵌套
```
		FileInputStream fis = null;
		FileOutputStream fos = null;
		try {
			fis = new FileInputStream("aaa.txt");
			fos = new FileOutputStream("bbb.txt");
			int b;
			while((b = fis.read()) != -1) {
				fos.write(b);
			}
		} finally {
			try {
				if(fis != null)
					fis.close();				//能关掉一个算一个
			}finally {
				if(fos != null)
					fos.close();
			}
		}
```


### 1.7版本新特性之异常处理的标准代码：
- 新特性：
	> 在try后接一个小括号，我们把流对象写在小括号内，程序运行完之后自动关闭流

- 为什么会自动关闭流？
> 因为，FileInputStream 与 FileOutputStream 类都实现了AutoCloseable接口，当然我们自己写个类然后重写close方法也能实现自动关闭

- 注意事项：
> 在开发中用到的不多，但是要知道，因为面试肯能会遇到。

* try close
```
		try(
			FileInputStream fis = new FileInputStream("aaa.txt");
			FileOutputStream fos = new FileOutputStream("bbb.txt");
			MyClose mc = new MyClose();
		){
			int b;
			while((b = fis.read()) != -1) {
				fos.write(b);
			}
		}

```


### 拓展知识之——文件加密
- 原理
	> 我们知道2 ^ 3 = 1这是个异或运算也就是0010 ^ 0011 = 0001.
	> 
	> 那么我们就可以
	> 
	> `源数据 ^ 密文 = 加密后的数据`
	> `加密后的数据 ^ 密文 = 源数据`
	> 
	> 通过异或这个原理，我们可以知道用`相同数异或两编，那么原来的数就会回来`，这样我们就可以再写出字节流时，把写出的数据进行一遍异或运算，这样就达到了加密的效果，解密就是读取的时候再异或**`同样的数`**，这样原来的数据就回来了，不过这样加密数据为了代码更加简洁就需要使用Buffered的字节流对象，不能自己创建缓冲区了。