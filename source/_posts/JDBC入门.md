---
title: JDBC入门
categories: JDBC
copyright: true
date: 2019-04-19 09:58:35
tags:
- JDBC入门
- JDBC面试题
---
# 概念（面试题）
> 全名：Java DataBase Connectivity
> java数据库连接，也就是java语言操作数据库
> 
# 本质：（面试题）
> JDBC定义了一套操作所有关系型数据库（mysql、oracle等等）的规则，也就是**接口**。
> 然后各个数据库厂商去实现这套接口，提供数据库驱动jar包。
> 我们可以用JDBC这套接口编程，真正执行的代码其实是驱动jar包中的实现类

<!--more-->

# JDBC使用方法
> 1、导入jar包：添加libs文件夹，然后右键 --> Add as library
> 2、注册驱动
> 3、获取数据库连接对象（connection）
> 4、定义sql语句
> 5、获取执行sql语句的对象：statement
> 6、执行sql，接收返回结果
> 7、处理结果
> 8、释放资源

案例：
```
        // 1、导入jar包
        // 2、注册驱动
        Class.forName("com.mysql.jdbc.Driver");
        // 3、获取数据库连接对象（connection）
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/db1",
                "root", "123456");
        // 4、定义sql语句
        String sql = "SELECT * FROM emp;";
        // 5、获取执行sql语句的对象：statement
        Statement stat = conn.createStatement();
        // 6、执行sql，接收返回结果
        Boolean b = stat.execute(sql);
        // 7、处理结果
        System.out.println(b);
        // 8、释放资源
        conn.close();
        stat.close();
```


# JDBC中常用对象
- DriverManager：驱动管理对象
- Connection： 数据库连接对象
- Statement：执行sql的对象
- ResultSet：结果集对象
- PerparedStatement：执行sql对象，它是Statement子类，它的功能更加强大

### DriverManager
功能：
- **注册驱动**
	> static void registerDriver（Deiver d）：注册与给定的驱动程序 DriverManager
	> 写代码使用：Class.fromName（“com.mysql.jdbc.Driver”）;
	> 
	> 通过查看源码发现：在com.mysql.jdbc.Driver类中存在静态代码块
```
static {
        try {
            DriverManager.registerDriver(new Driver());	//注册驱动
        } catch (SQLException var1) {
            throw new RuntimeException("Can't register driver!");
        }
    }
```

ps：mysql 5 之后的mysql驱动包是可以省略注册驱动操作的，因为它会自动注册驱动


- **获取数据库连接**
	- 方法：static Connection getConnection（String url， String user， String password）;
	- url语法：jdbc:mysql://主机地址:端口/数据库名
	- ps:mysql数据库简写：jdbc:mysql:///数据库名


### Connection：数据库连接对象
- 功能
	- 获取执行sql的对象
		> Statement createStatement()
		> PreparedStatement PreparedStatement()
	
	- 管理实务：
		> 开启事务：void setAutoCommit(boolean b) ：false代表关闭自动提交，即开启事务
		> 提交事务：commit() ： 提交事务
		> 回滚事务：rollack() : 撤销事务，回滚事务

### Statement ：执行sql的对象
- boolean execute(sql) : 它可以执行任何静态方法，但不是很长用
- int execteUpdate(sql) : 可以执行 DML增删改 、DDL(create、alter、drop。。)
	> 返回值是影响的行数，可以用来判断是否执行成功

- ResultSet executeQuery(sql) ： 执行DQL(select)语句
	> 用来执行查询语句，返回一个ResultSet对象，平时很常用



###  ResultSet ： 结果集对象
- next() : 向下获取一行
- getXXX() ：获取数据
	> XXX代表数据类型
	> 
	> 参数：
	> - int ：代表列的编号，从1开始（1代表获取第一列的值）
	> - String ：代表列的名称