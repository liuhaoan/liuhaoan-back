---
title: Mysql数据库之——DQL查询记录
categories: MySql
copyright: true
date: 2019-04-17 11:00:13
tags:
- MySql数据库DQL
- 面试题：where和having的区别
---
# 概述
> 查询表中的数据

# 语法
```
select
	字段
from
	表名
group by
	分组字段
having
	分组之后的条件
order by
	排序
limit
	分页限定
```

<!--more-->

### 查询所有
```
SELECT * FROM student;
```
ps：不建议用*号，建议把所有表名写出来，因为这样更方便写注释

### 查询后去除重复
```
SELECT DISTINCT name FROM student;
```
ps：必须结果集完全一样才行，如果我们查询两个字段，那么两个字段的结果集必须全部相同才能够去除重复

### 查询字段值之和
```
SELECT name,math,english,math + english from student;
```
- 解析：查询名字、数学成绩、英语成绩、数学英语成绩之和

- 但是有个问题，如果分数都是null，那么结果也是null

- 解决方法：

```
SELECT name,IFNULL(math, 0),IFNULL(english, 0),IFNULL(math, 0) + IFNULL(english, 0) from student;
```
解析：IFNULL(字段名， 替换的值)为判断某个字段是否为null，是null则替换值。

- 查询字段之和后显示的不尽人意，我们可以给它取别名

```
SELECT name,math,english,math + english AS 总分 from student;
```
解析：意思是给math + english字段起别名
ps：AS可以替换为空格

### 条件查询
- 格式：
	> where 后跟条件

- 运算符
	> 1、`>、<、<=、>=、=、<>`
	> 
	> 2、在一个范围之内 ：`BETWEEN...AN`
	> 例如：`between 100 and 200`相当于条件在 100 到 200 之间，包头又包尾
	> 
	> 3、`IN(集合)` ： 集合表示多个值，使用逗号分隔，只要配对的上就查得出来
	> 
	> 4、`LIKE '张%'` ： 模糊查询
	> 
	> 5、`IS NULL` : 查询某一列为 NULL 的值，注：不能写=NULL
	> 
	> 6、`and 或 &&`  **与**，SQL 中建议使用前者，后者并不通用。
	> 
	> 7、`or 或 ||` **或**
	> 
	> 8、`not 或 !`  **非**


- 注意事项
	- 判断是否为null值时，不能直接等号，必须使用is null


### 模糊查询
- 格式：
	> select * from 表名 where 字段 like 条件；

- 占位符：
	- `_` : 代表单个任意字符
	- `%` : 代表0或者多个


### 排序查询
- 语法：
	- order by 子句
	- order by 排序字段1 排序方式1, ...排序字段n 排序方式n；

- 注意事项
	- 如果有多个排序条件，当前面排序条件值一样时，才会判断第二条件


- 排序方式
	- ASC：升序，也是默认的
	- DESC：降序


### 聚合函数
> 将一列的数据作为一个整体，然后纵向计算
> 
> 注意事项：聚合函数的计算会排除null值
> 解决方法：
> 1、使用ifnull替换null值
> 2、选择非空的列计算（主键、*）


- count：计算个数
- max：计算最大值
- min：计算最小值
- sum：计算和
- avg：计算平均值

例子：计算总数
```
SELECT count(id) FROM student;
```


### 分组查询
- 语法：group by 分组字段；
- 
- 注意事项：
	> 分组之后查询的字段一般为：分组字段、聚合函数，因为查一个组共有的信息才有意义

例子：以男女分组，查询70分以上同学的平均分，并且每组的人数超过2人
```
SELECT sex AVG(math) COUNT(id) number from student WHERE math > 70 GROUP BY sex HAVING number > 2;
```

### 面试题：where和having的区别
> 1、where 在分组之前进行限定，如果不满足条件，则不进行分组操作。having 在分组之后进行操作，如果不满足条件就不显示
> 
> 2、where 后不可以跟聚合函数，having后可以跟聚合函数


### 分页查询
- 语法：
	> limit 开始索引，每页的条数;
	> 
	> 开始索引公式：
	> （页码索引 - 1） * 每页的条数 = 开始的索引

案例：每页显示3条记录
```
SELECT * FROM student LIMIT 0,3；	-- 第一页
SELECT * FROM student LIMIT 3,3；	-- 第二页
SELECT * FROM student LIMIT 6,3；	-- 第三页
```

ps：limit是MySql独有的，其他数据库不是这个关键字