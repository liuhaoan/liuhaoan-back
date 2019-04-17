---
title: Mysql数据库之——DML增删改
categories: MySql
copyright: true
date: 2019-04-17 10:09:18
tags:
- MySql数据库DML
---
# 概述
> 用于对表中的记录进行增删改操作

# 插入记录（添加记录）
- 语法：
	- `insert into 表名(列名1,列名2,···列名n) values(值1,值2,···值n)`

<!--more-->

- 例子：

```
insert into student(id,name,age) values(1,"张无忌",18);
```

- 注意事项
	1. 列名一定要和值一 一对应，类型也需要对应。
	2. 如果表名后，不定义列名，则默认给所有列添加值。
	3. 除了数字类型，其他类型需要使用引号引起来


# 删除数据
- 语法：
	- `delete from 表名 [where 条件]`

- 例子：删除id为1的记录

```
delete from student where id=1;
```

- 注意事项：
	1. 不加条件会吧所有记录删除
	2. 需要删除所有记录不建议用这个语句，因为有多少条记录就执行了多少次，严重影响效率
	3. 需要删除所有记录用：truncate table； -- 先删除表，然后创建一张一模一样的空表


# 修改数据
- 语法：
	- `updata 表名 set 列名1 = 值1, 列名2 = 值2,··· [where 条件]`

- 例子：修改id为1的记录中名字改成“张无忌”

```
updata student set name = "张无忌" where id = 1;
```

- 注意事项：
	1. 不加任何条件，则将所有记录都修改