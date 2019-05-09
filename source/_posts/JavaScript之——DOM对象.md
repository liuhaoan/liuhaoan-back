---
title: JavaScript之——DOM对象
categories: JavaScript
copyright: true
date: 2019-05-08 16:41:24
tags:
- DOM对象
---
# 概念
> Document Object Model 文档对象模型
> 
> 将标记语言文档的各个组成部分，封装为对象。可以使用这些对象，对标记语言文档进行CRUD的动态操作
> 
> 它允许程序和脚本动态地访问和更新文档内容 、结构和样式

<!--more-->

## W3C DOM 标准被分为3个不同的部分
- 核心 DOM ：针对任何结构化文档的标准模型
	- Document：文档对象
	- Element：元素对象
	- Attribute：属性对象
	- Text：文本对象
	- Comment：注释对象
	- Node：节点对象，它是其他五个的父对象


- XML DOM ：针对 XML 文档的标准模型
- HTML DOM：针对 HTML 文档的标准模型


## 核心DOM模型
#### document：文档对象
- 创建(html模型中)：
	- winodw.document
	- document
- 方法
	- **`获取element对象（重要）`**
		- getElementById():根据id属性值获取指定元素，id属性值一般都是唯一的
		- getElementsByTagName()：根据元素名称获取元素对象们，返回一个数组
		- getElementsByClassName():根据Class属性值获取元素对象们，返回一个数组
		- getElementsByName()：根据name值获取元素对象们，返回一个数组，Input方法用的比较多
	- 创建其他DOM对象
		- createElement()：创建一个元素
			- 例如：document.createElement("table");
			- 表示创建了一个table标签元素，但是与当前文档没任何关系
			- 如果需要添加到当前文档中需要添加到某个节点的子节点中
			- 例如：节点对象名.appendChild(创建的元素对象);
- 属性



#### Element：元素对象
- 获取：通过document来获取和创建
- 方法
	- removeAttribute()：删除属性
	- setAttribute()：设置属性



#### Node：节点对象，其他五个的父对象
- 特点：所有DOM对象都可以被认定为是一个节点
- 方法：
	- CRUD dom树的方法
		- 节点对象.appendChild(对象)：向节点的子节点列表的结尾添加新的子节点
		- 节点对象.removeChild(对象)：删除（并返回）当前节点的指定子节点
		- 节点对象.replaceChile(对象):用新的节点替换一个字节点

- 属性：
	- parentNode：返回当前节点的父节点


#### 何为DOM树？
> DOM树可以看做整个页面的文档，顾名思义，树就肯定有树根，在DOM树中，树根就时文档，它一定有一个分支，那就是：html ，html下面又一定有两个分支，分别为head与body，剩下的树枝以此类推


## HTML DOM
> 具体看w3school教程网

#### 控制样式
- 使用style属性设置
- 先定义好CSS，并且用类选择器，然后通过`div.className = “xxx”;`来设置成定义好的CSS类即可
- 
- ps：前者适合少量CSS代码，后者适合大量CSS代码

例子：使用style设置样式
```
var div1 = document.getElementById("div1");

//设置边框
div1.style.border = "1px solid red";

//设置宽度
div1.style.width = "200px";

//设置字体大小
div1.style.fontSize = "20px"; 
```


# 练习：添加删除
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>test</title>

	<style>
		div {
			width: 200px;
			height: 200px;
			border: 1px red solid;
		}
	</style>
</head>
<body>
	<a href="javascript:void(0);" id="add">add</a>
	<a href="javascript:void(0);" id="remove">remove</a>
<script>
	//获取body对象，并且记录索引
	var body = document.getElementsByTagName("body")[0];
	var divIndex = 0;

	//添加
	var add = document.getElementById("add");
	add.onclick = function() {
		var div = document.createElement("div");
		div.setAttribute("id", "div" + divIndex++);
		body.appendChild(div);
	}


	//删除
	var remove = document.getElementById("remove");
	remove.onclick = function() {
		var div = document.getElementById("div" + --divIndex);
		body.removeChild(div);
	}


</script>
</body>
</html>
```


# 练习：动态表格
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>动态表格</title>

	<style>
		body {
			padding: 0;
			margin: 0;
		}

		div {
			width: 500px;
			margin: 100px auto;
		}

		.table {
			width: 300px;
		}

		.table > table {
			width: 300px;
		}

		td,th {
			border: 1px solid;
		}
	</style>
</head>
<body>
	<div class="add">
		<p>请输入姓名与性别</p>
		<label for="name">姓名：<input type="text" id="name"></label>
		<label for="gender">性别：<input type="text" id="gender"></label>
		<input type="button" value="添加" id="add">
	</div>
	<div class="table">
		<table cellpadding="0" cellspacing="0">
			<caption>学生信息表</caption>
			<thead>
				<tr>
					<th>姓名</th>
					<th>性别</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id="table">
				
			</tbody>
		</table>
	</div>
	<script>
		//获取table对象与添加按钮对象，并且记录索引
		var table = document.getElementById("table");
		var addButton = document.getElementById("add");

		//添加
		addButton.onclick = function() {
			//获取姓名、性别输入框对象
			var name = document.getElementById("name");
			var gender = document.getElementById("gender");

			//判断输入是否为空
			if(name.value == "" || gender.value == "") {
				var errorMessage = document.getElementsByTagName("p")[0];
				errorMessage.setAttribute("style", "color:red");
				return;
			}

			//创建表格中的一行数据
			var tr = document.createElement("tr");
			var nameTd = document.createElement("td");
			var genderTd = document.createElement("td");
			var operation = document.createElement("td");
			var remove = document.createElement("a");

			//设置刚刚创建对象中的姓名与性别
			nameTd.innerHTML = name.value;
			genderTd.innerHTML = gender.value;

			//设置删除按钮
			remove.setAttribute("href", "javascript:void(0);");
			remove.setAttribute("onclick", "remove(this)");
			remove.innerHTML = "删除";

			//把删除按钮添加到刚刚创建相关操作的tr标签对象中
			operation.appendChild(remove);


			//把一条记录的相关信息添加到表格的tr中
			tr.appendChild(nameTd);
			tr.appendChild(genderTd);
			tr.appendChild(operation);

			//把刚刚创建这一行数据添加进表格中
			table.appendChild(tr);
		}

		//删除按钮调用
		function remove(obj) {
			var parent = obj.parentNode.parentNode;
			table.removeChild(parent);
		}
	</script>
</body>
</html>
```

# 练习：动态表格innerHTML版
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>动态表格</title>

	<style>
		body {
			padding: 0;
			margin: 0;
		}

		div {
			width: 500px;
			margin: 100px auto;
		}

		.table {
			width: 300px;
		}

		.table > table {
			width: 300px;
		}

		td,th {
			border: 1px solid;
		}
	</style>
</head>
<body>
	<div class="add">
		<p>请输入姓名与性别</p>
		<label for="name">姓名：<input type="text" id="name"></label>
		<label for="gender">性别：<input type="text" id="gender"></label>
		<input type="button" value="添加" id="add">
	</div>
	<div class="table">
		<table cellpadding="0" cellspacing="0">
			<caption>学生信息表</caption>
			<thead>
				<tr>
					<th>姓名</th>
					<th>性别</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody id="table">

			</tbody>
		</table>
	</div>
	<script>
		//获取table对象与添加按钮对象，并且记录索引
		var table = document.getElementById("table");
		var addButton = document.getElementById("add");

		//添加
		addButton.onclick = function() {
			//获取姓名、性别输入框对象
			var name = document.getElementById("name").value;
			var gender = document.getElementById("gender").value;

			//判断输入是否为空
			if(name == "" || gender == "") {
				var errorMessage = document.getElementsByTagName("p")[0];
				errorMessage.setAttribute("style", "color:red");
				return;
			}

			//添加数据
			table.innerHTML += "<tr>\n" 
			+ "					<td>" + name + "</td>\n"
			+ "					<td>" + gender + "</td>\n"
			+ "					<td>" 
			+ '<a href="javascript:void(0);" onclick="remove(this);">删除</a>' 
			+ "</td>\n"
		}

		//删除按钮调用
		function remove(obj) {
			var parent = obj.parentNode.parentNode;
			table.removeChild(parent);
		}
	</script>
</body>
</html>
```