---
title: Mysql数据库之——DDL数据库与表的操作
categories: MySql
copyright: true
date: 2019-04-15 17:04:07
tags:
- MySql数据库DDL
- 面试题
---
# DDL概述
> 用来定义数据库对象：数据库、表、列等

#### DDL ： 操作数据库、表（CRUD）
- C(Create) : 创建
- R(Retrieve) ： 查询
- U(Update) : 修改
- D(Delete) ： 删除

<!--more-->

#### 创建数据库 ： create
- 创建数据库
	> CREATE DATABASE 数据库名;

- 判断数据库是否已经存在，不存在则创建数据库
	> CREATE DATABASE IF NOT EXISTS 数据库名;

- 创建数据库并指定字符集
	> CREATE DATABASE 数据库名 CHARACTER SET 字符集;

- 操作示例
```
-- 直接创建数据库 db1
create database db1;

-- 判断是否存在，如果不存在则创建数据库 db2
create database if not exists db2;

-- 创建数据库并指定字符集为 gbk
create database db3 default character set gbk;
```

#### 查询数据库
```
-- 查看所有的数据库
show databases;

-- 查看某个数据库的定义信息
show create database db3;
show create database db1;
```


#### 修改数据库
- 修改数据库默认的字符集
	> ALTER DATABASE 数据库名 DEFAULT CHARACTER SET 字符集;
**例子：将 db3 数据库的字符集改成 utf8**
```
alter database db3 character set utf8;
```
- 删除数据库
	> DROP DATABASE 数据库名;
**例子：删除 db2 数据库**
```
drop database db2;

//判断是否存在，存在则删除
drop database if exists db2
```
- 查看正在使用的数据库
	> SELECT DATABASE(); 使用的一个 mysql 中的全局函数
- 使用/切换数据库
	> USE 数据库名;
例子：
```
-- 查看正在使用的数据库
select database();

-- 改变要使用的数据库
use db4;
```

# 面试题
在 MySQL 数据库软件中，有如下三个数据库：
- test1
- test2
- test3

登录数据库之后，输入语句：select database test2; 运行结果是什么?

**答：这是一条错误的语句，如果要选中一个数据库，应用使用：use test2;**


# DDL 操作表结构
> **前提先使用某个数据库**

### 创建表
- 语法：
```
create table 表名(
	列名1 数据类型1，
	列名2 数据类型3，
	···
	列名n 数据类型n
);
```
- 关键字说明：
	- CREATE 创建
	- TABLE 表

- **datatime和timestamp类型的区别：**
	- 如果不给这个字段赋值，或者赋值为null，那么timestamp类型的字段则使用当前的系统时间自动赋值，而datatime则不会

- 例子：创建一个学生表

```
create table student(
	id int,
	name varchar(32),
	age int
);
```


#### MySql数据类型
分类 | 类型名称 | 类型说明
- | - | - 
整数 | tinyInt | 微整型：很小的整数(占 8 位二进制)
整数 | smallint | 小整型：小的整数(占 16 位二进制)
整数 | mediumint | 中整型：中等长度的整数(占 24 位二进制)
整数 | int(integer) | 整型：整数类型(占 32 位二进制)
||
小数| float | 单精度浮点数，占 4 个字节
小数| double | 双精度浮点数，占 8 个字节
||
日期 | time | 表示时间类型
日期 | date | 表示日期类型
日期 | datetime | 同时可以表示日期和时间类型
日期 | timestamp | 表示时间错
||
字符串 | char(m) | 固定长度的字符串，无论使用几个字符都占满全部，M 为 0~255 之间的整
字符串 | varchar(m) | 可变长度的字符串，使用几个字符就占用几个，M 为 0~65535 之间的整数
||
二进制 | tinyblob Big Large Object | 允许长度 0~255 字节
二进制 | blob | 允许长度 0~65535 字节
二进制 | mediumblob | 允许长度 0~167772150 字节
二进制 | longblob | 允许长度 0~4294967295 字节
||
文本 | tinytext | 允许长度 0~255 字节
文本 | text 允许长度 | 0~65535 字节
文本 | mediumtext | 允许长度 0~167772150 字节
文本 | longtext | 允许长度 0~4294967295 字节


- **案例 : 创建 student 表包含 id,name,birthday 字段**

```
create table student (
	id int, -- 整数
	name varchar(20), -- 字符串
	birthday date -- 生日，最后没有逗号
);

```

### 查看表
- 查看某个数据库中的所有表
	> SHOW TABLES;

- 查看表结构
	> DESC 表名;

- 查看创建表的 SQL 语句
	>  SHOW CREATE TABLE 表名;

**例子： 查看 test1 数据库中的所有表**
```
use test1;
show tables;

```

**例子： 查看 student 表的结构**
```
desc student;
```

**例子： 查看 student 的创建表 SQL 语句**
```
show create table student;

//结果
CREATE TABLE `student` (
 `id` int(11) DEFAULT NULL,
 `name` varchar(20) DEFAULT NULL,
 `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8

```

### 快速创建一个表结构相同的表
> CREATE TABLE 新表名 LIKE 旧表名;

例子：
```
-- 创建一个 s1 的表与 student 结构相同
create table s1 like student;
desc s1;

```



### 删除表
- 直接删除表
	> DROP TABLE 表名;

- 判断表是否存在，如果存在则删除表
	> DROP TABLE IF EXISTS 表名;

例子：
```
-- 直接删除表 s1 表
drop table s1;

-- 判断表是否存在并删除 s1 表
drop table if exists `s1`;

```

### 修改表结构
- 添加表列 ADD
	> ALTER TABLE 表名 ADD 列名 类型;

- 修改列类型 MODIFY
	> ALTER TABLE 表名 MODIFY 列名 新的类型;

- 修改列名 CHANGE
	> ALTER TABLE 表名 CHANGE 旧列名 新列名 类型;

- 删除列 DROP
	> ALTER TABLE 表名 DROP 列名;

- 修改表名
	> RENAME TABLE 表名 TO 新表名;
例子：将学生表 student 改名成 student2
```
rename table student to student2;
```
- 修改字符集 character set
	> ALTER TABLE 表名 character set 字符集
例子：将 student2 表的编码修改成 gbk
```
alter table student2 character set gbk;
```