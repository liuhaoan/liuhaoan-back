---
title: javaSE复习之——网络编程_UDP传输
categories: JavaSE 复习
copyright: true
date: 2019-04-11 09:26:46
tags:
- 网络编程
- UDP传输
---
# UDP概念
> UDP协议相对于TCP协议，它是不保证数据安全的，但是它的传输速度相对更快，它不需要客户端服务端进行连接。

ps：服务端必须指定端口号，发送端可以随机端口号，但是Packet数据报对象必须指定服务端的端口号

<!--more-->

### 创建一个服务端
```
	DatagramSocket socket = new DatagramSocket(6666);
	//创建Socket相当于创建码头

	DatagramPacket packet = new DatagramPacket(new byte[1024], 1024);
	//创建Packet数据报包相当于创建集装箱

	socket.receive(packet);
	//接收数据相当于接货

	byte[] arr = packet.getData();
	//获取数据缓冲区

	int len = packet.getLength();
	//获取有效的字节个

	String ip = packet.getAddress().getHostAddress();
	//获取ip地址

	int port = packet.getPort();
	//获取端口号
	System.out.println(ip + ":" + port + ":" + new String(arr,0,len));
```



### 创建一个客户端：
```
	Scanner sc = new Scanner(System.in);
	DatagramSocket socket = new DatagramSocket();
	//创建Socket相当于创建码头

	String line = sc.nextLine();
	//获取键盘录入的字符串

	if("quit".equals(line)) {
		break;
	}

	//创建Packet相当于集装箱
	DatagramPacket packet = new DatagramPacket(line.getBytes(), line.getBytes().length, InetAddress.getByName("127.0.0.1"), 6666);
	socket.send(packet);
	//发货,将数据发出去

	socket.close();
	//关闭码头
```