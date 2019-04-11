---
title: javaSE复习之——Junit单元测试
categories: JavaSE 复习
copyright: true
date: 2019-04-11 15:20:44
tags:
- Junit单元测试
---
# Junit：单元测试
### 概念：
> 单独测试某个方法的运行，不需要main方法即可直接在被测试的方法处运行


### 测试分类：
- 黑盒测试
	> 不需要写代码，给输入值，看程序是否能输出期望的值
- 白盒测试
	> 需要写代码，关注程序的具体执行流程，ps：Junit是属于白盒测试

<!--more-->

### Junit的使用：白盒测试
- 步骤
	> - **定义一个测试类（测试用的例子）**
		> 建议：
		> 测试包名：	被测试的类名	calcullatorTest
		>  包名：		xxx.xxx.xxx.Test

	> - **定义测试方法：可以独立运行**
		> 建议：
		> 方法名：	test测试的方法名
		> 返回值：	void
		> 参数列表：	空参

	> - **给方法加@Test注解**
		> ps:
		> 给方法加上@Test注解即可直接在该方法开始运行，此方法不需要式main方法

- Junit之断言
	- 方法
		> Assert.assertEquals( 期望的结果， 运算的结果)
	- ps：
		> 期望结果与运算结果相同则显示绿色，否则红色。

- Junit实例
```
		@Test
		public void testSub() {
			int i = 1 + 1;
			Assert.assertEquals(3, i);
		}
		//Junit工具会显示红色的，因为预期和结果不同
```

- 补充
	- @Before：
	> 修饰的方法会在测试 方法被执行前执行，可以用来初始化一些东西
	- @After：
	> 修饰 的方法会在测试方法执行之后自动执行，可以做一些关闭流之类的操作