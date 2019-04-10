---
title: javaSE复习之——GUI
categories: JavaSE 复习
copyright: true
date: 2019-04-10 18:51:03
tags:
- GUI
- GUI布局管理器
- GUI窗体监听
- GUI鼠标监听
- GUI键盘监听
- GUI键盘事件
- GUI动作监听
---
# Gui的概述
> 它是一个图形用户接口

### GUI的类
> Frame

### 创建一个窗口
```
Frame f = new Frame();
```
ps：刚创建时不可见的

<!--more-->

### Frame的方法：
- .setVisible()
	> 设置窗口是否可见
- .setSize(100,200)
	> 设置窗体大小
- .setLocation(500. 50)
	> 设置窗体位置
- .setIconImage(Toolkit.getDefaultToolKit().createImage("1.png"))
	> 设置窗体图标
- .setLayout(new FlowLayout());
	> 设置布局管理器


### 添加一个按钮：
```
Button b1 = new Button("按钮一");
Button b2 = new Button("按钮二");
f.add(b1);		//向组件添加指定的弹出菜单
f.add(b2);
```


# GUI布局管理器
- FlowLayout（流式布局管理器）
	> 从左到右的顺序排列。
	> Panel默认的布局管理器。
- BorderLayout（边界布局管理器）
	> 东，南，西，北，中
	> Frame默认的布局管理器。
- GridLayout（网格布局管理器）
	> 规则的矩阵
- CardLayout（卡片布局管理器）
	> 选项卡
- GridBagLayout（网格包布局管理器）
	> 非规则的矩阵

### 布局管理器类的一些常用方法
- .setEditable(booleam)
	> 设置这个布局是否可编辑
- .setBackground(Color.WHITE)
	> 设置背景颜色
- .setFont()	
	> 设置字体


### 布局管理器常用类：
- Panel
	> 是最简单的容器类。应用程序可以将其他组件放在面板提供的空间内，这些组件包括其他面板。 

- TextField
	> 单行文本框
- TextArea
	> 多行文本框



# GUI窗体监听概述
> 用于接收窗口事件的侦听器接口，当通过`打开、关闭、激活或停用、图标化或取消图标化`而改变了窗口状态时，将调用该侦听器对象中的相关方法。

### 窗体监听接口
> WindowListener


### 窗口监听方法一
- **使用创建类实现WindowListener接口并且重写方法实现，需要重写多个对象，并且还必须创建类，所以麻烦不推荐**
	> 1、创建一个类实现WindowListener接口
	> 
	> 2、把WindowListener接口中每一个方法都重写
	> 
	> 3、创建那个类的对象，然后调用f.addWindowListener方法传入这个对象。


### 窗口监听方法二（直接传入一个匿名内部类）
- ps
	> WindowAdapter适配器实现并重写了WindowListener接口，我们只要继承它重写方法就可以只重写一个方法了。

- 代码示例

```
	Frame f = new Frame("我的窗体");
	//事件源是窗体,把监听器注册到事件源上

	//事件对象传递给监听器
	f.addWindowListener(new WindowAdapter() {
	          public void windowClosing(WindowEvent e) {
	                     //退出虚拟机,关闭窗口
			System.exit(0);
		}
	});

```


# GUI鼠标监听
- 添加一个鼠标监听
	> b1.addMouseListener（）

- 鼠标监听接口
	> MouseListener

- 与窗体监听同理，他有一个适配器
	> MouseAdapter

ps：创建鼠标监听与窗体监听同理，具体看api



# GUI键盘监听和键盘事件
- 添加一个键盘监听
	> b1.addKeyListener（）

- 键盘监听接口
	> KeyListener

- 与窗体监听同理，他有一个适配器
	> KeyAdapter

ps：创建键盘监听与窗体监听同理，具体看api

ps：单独添加一个键盘监听的话，只要键盘按下任何键，程序都会执行重写方法中的代码

- KeyEvent类
	> 当我们按下某键时，会给监听器传入一个KeyEvent类，它是用户按下的某键


- 代码示例

```
		b1.addKeyListener(new KeyAdapter() {
			@Override
			public void keyReleased(KeyEvent e) {
				//System.exit(0);
				//System.out.println(e.getKeyCode()); 		//获取用户输入的按键代码
				//if(e.getKeyCode() == 32) {
				if(e.getKeyCode() == KeyEvent.VK_SPACE){	//KeyEvent.VK_SPACE为空格，它是个常量
					System.exit(0);
				}
			}
		});

```


# GUI动作监听
- 添加一个键盘监听
	> b2.addActionListener（）

- 键盘监听接口
	> ActionListener

ps：因为这个接口只有一个方法，所以没有适配器，适配器只是为了在多方法接口中只重写一个方法

ps：创建键盘监听与窗体监听同理，具体看api

- 应用场景
	> 暂停视频和播放视频