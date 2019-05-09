---
title: JavaScript之——BOM对象
categories: JavaScript
copyright: true
date: 2019-05-08 10:44:53
tags:
- BOM对象
---

# 概念
> Browser Object Model 浏览器对象模型，它将浏览器各个组成部分封装成对象

### 组成
- window：窗口对象
	- DOM对象（document）
- Navigator：浏览器对象（不重要）
- Screen：显示器屏幕对象（不重要）
- History：历史记录对象
- Location：地址栏对象

<!--more-->

### window
##### 创建

##### 弹出框有关方法
- alert()：弹出带有一段消息和一个确认按钮的警告框
- confirm()：确认取消对话框，确定true，取消false
- prompt()：弹出一个用户输入框，提示什么传入什么，返回用户输入的值

##### 打开关闭有关方法
- open()：打开一个新窗口，返回打开窗口的window对象
- close()：关闭一个窗口，哪个window对象调用关哪个窗口

##### 定时器有关方法
- setTimeout():定时器，经过指定毫秒数之后执行某代码
- clearTimeout():取消定时器
- setInterval():循环定时器，按照指定周期
- clearInterval():取消循环定时器
- 参数
	- js代码或者方法对象
	- 毫秒值
- 返回值：唯一标识符，用于取消定时器

##### 属性
- 获取其他BOM对象
	- Navigator：浏览器对象（不重要）
	- Screen：显示器屏幕对象（不重要）
	- History：历史记录对象
	- Location：地址栏对象
- 获取DOM对象
	- document


##### 特点
- Window对象不需要创建可以直接使用 Window使用：window.方法名();
- window引用可以省略，直接方法名调用。


### Location地址栏对象
##### 创建
> 1、window.location
> 2、location

##### 方法
- reload():刷新浏览器，重新加载当前文档


##### 属性
- herf：获取浏览器url地址



### History历史记录对象
##### 创建
- window.history
- histor

##### 方法
- back()：加载前一个url
- forward() ：加载下一个url
- go():加载某个具体的页面
	- 参数：整数
	- 正数：前进几个历史记录
	- 负数：后退几个历史记录


##### 属性
- length：返回当前窗口历史列表中的 url 数量