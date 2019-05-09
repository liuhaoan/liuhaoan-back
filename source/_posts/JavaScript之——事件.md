---
title: JavaScript之——事件
categories: JavaScript
copyright: true
date: 2019-05-09 16:19:31
tags:
- js事件
---

# 概念
> 某些组件被执行了某些操作后，出发某些代码的执行，例如onclick

- 事件：某些操作，如：单机、双击、键盘按下了、鼠标移动了
- 事件源：组件。如：按钮、文本输入框···
- 监听器：代码（发生某些操作后执行的代码）
- 注册监听：将事件、事件源、监听器结合在一起。当事件源上发生某个事件，则触发某个监听器代码

<!--more-->


## 常见事件
#### 点击事件
- onclick：单机事件
- ondblclick：双击事件

#### 焦点事件
- onblur：失去焦点
	- 一般用于表单验证
- onfocus：获得焦点

#### 加载事件
- onload：一张页面或者一张图片加载完成
	- 我们一般用：window.onload

#### 鼠标事件
- onmousedown：鼠标被按下
- onmouseup：鼠标松开
- onmousemove：鼠标被移动
- onmouseover：鼠标移动到某个元素之上
- onmouseout：鼠标从某个元素松开

ps：当鼠标事件发生时，浏览器引擎会自动传一个对象过来event，我们可以通过这个对象查看是发生了什么事件调用的对象
例子：
```
document.getElementById("username").onmousedown = function(event) {
	alert(event.button);//鼠标左键0，滚轮1，右键2
}
```


#### 键盘事件
- onkeydown：某个键盘按键被按下
- onkeyup：某个按键被松开
- onkeypress：某个按键按下并松开


#### 选中和改变
- onchange：内容被改变
- onselect：内容被选中


#### 表单事件
- onsubmit：确认按钮被点击，表单提交
	- 可以阻止表单的提交，返回true提交，返回false不提交
- onreset：重置按钮被点击
- 注意：在html元素的属性中直接调用事件时，比如onclick事件，js引擎会自己生成一个方法，这个方法调用onclick属性内部的值，这样的话，我们在属性值中直接调用方法时，就算这个方法有返回值那么也是收不到的，如果需要有返回值，onclick属性值就需要这样写：`return 方法名();`