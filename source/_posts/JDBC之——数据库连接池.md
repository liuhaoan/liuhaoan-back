---
title: JDBC之——数据库连接池
categories: JDBC
copyright: true
date: 2019-04-28 16:40:39
tags:
- 数据库连接池
---
# 数据库连接池概念
> 数据库连接池负责分配,管理和释放数据库连接,它允许应用程序重复使用一个现有的数据库连接,而不是重新建立一个
> 
> 其实就是一个存放数据库连接的容器（集合）
> 
> 当系统初始化好后，容器被创建，容器中会申请一些连接对象，当用户访问数据库时，从容器中获取对象，用完后放回去

- 好处
	- 节约资源
	- 高效

<!--more-->

- 数据库连接池实现原理
	> 数据库连接池在初始化时将创建一定数量的数据库连接放到连接池中, 这些数据库连接的数量是由最小数据库连接数来设定的.无论这些数据库连接是否被使用,连接池都将一直保证至少拥有这么多的连接数量
	> 
	> 当应用程序向连接池请求的连接数超过最大连接数量时,这些请求将被加入到等待队列中。

# 数据库连接池的实现
- 标准接口：DataSource

它是java.sql包下的，并且他是一个接口，具体的实现由数据库厂商提供的驱动包实现

- 方法：
	- 获取连接对象：getConnection()
	- 归还连接：只要连接对象时从连接池获取的，那么调用close则是归还，而不是关闭。

- 两种实现数据库连接池的技术
	- C3P0：比较老
	- Druid：由阿里巴巴提供的，它更新，并且它的性能很高效，号称全球最好的数据库连接池技术之一。

#### C3P0技术实现数据库连接池
- 实现步骤（一种定死配置，一种读配置文件，这里只说读配置文件）
	> 1、导入jar包（一个主要的jar包，一个依赖的jar包）
	> 2、定义配置文件（驱动自动找配置）
	> - 名称：c3p0.properties 或者 c3p0-config.xml
	> - 路径：直接把文件放在src目录下即可
	> 
	> 3、创建核心数据库连接池对象：ComboPooledDataSource
	> 4、获取连接：getConnection()
	> 
	> 注意事项：一定要导入数据库的驱动包

- 代码示例

```
/1.创建数据库连接池对象
DataSource ds  = new ComboPooledDataSource();

//2. 获取连接对象
Connection conn = ds.getConnection();
```

- 配置详情

```
<c3p0-config>
  <!-- 使用默认的配置读取连接池对象 -->
  <default-config>
  	<!--  连接参数 -->
    <property name="driverClass">com.mysql.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/db4</property>
    <property name="user">root</property>
    <property name="password">root</property>
    
    <!-- 连接池参数 -->
    <!--初始化申请的连接数量-->
    <property name="initialPoolSize">5</property>
    <!--最大的连接数量-->
    <property name="maxPoolSize">10</property>
    <!--超时时间-->
    <property name="checkoutTimeout">3000</property>
  </default-config>

  <named-config name="otherc3p0"> 
    <!--  连接参数 -->
    <property name="driverClass">com.mysql.jdbc.Driver</property>
    <property name="jdbcUrl">jdbc:mysql://localhost:3306/db3</property>
    <property name="user">root</property>
    <property name="password">root</property>
    
    <!-- 连接池参数 -->
    <property name="initialPoolSize">5</property>
    <property name="maxPoolSize">8</property>
    <property name="checkoutTimeout">1000</property>
  </named-config>
</c3p0-config>
```
ps:在创建数据库连接池创建连接池对象时，什么都不传那么使用默认配置，传了就使用指定名称配置


#### Druid技术实现数据库连接池（以后用这个）
- 基本使用
	> 1、导入jar包（别忘了驱动包）
	> 2、定义配置文件
	> - 配置文件是properties形式的
	> - 配置文件可以叫任意名称，可以放在任意目录下
	> 3、加载配置文件：properties
	> 4、获取数据库连接池对象：通过工厂来获取 DruidDataSourceFactory.createDataSource(pro)
	> 5、获取连接：getConnection




# 使用工具类操作数据库连接池练习
- 配置文件

```
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://192.168.220.160/db1
username=root
password=123456

# 初始化连接数量
initialSize=5

# 最大连接数
maxActive=10

# 最大等待时间
maxWait=3000
```

- JDBCUtilPond 数据库连接池工具类

```
package com.liuhaoan.demo.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class JDBCUtilPond {
    private static DataSource ds = null;


    static {
        Properties p = new Properties();
        try {
            p.load(JDBCUtilPond.class.getClassLoader().getResourceAsStream("druid.properties"));
            ds = DruidDataSourceFactory.createDataSource(p);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 从数据库连接池获取一个连接
     * @return 返回一个连接对象
     * @throws SQLException 为处理错误
     */
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }


    /**
     * 释放资源
     * @param s Statement sql执行对象
     * @param c 数据库连接对象
     */
    public static void close(Statement s, Connection c) {
        if(s != null) {
            try {
                s.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        if(c != null) {
            try {
                c.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * 释放资源
     * @param s Statement sql执行对象
     * @param c Connection 数据库连接对象
     * @param rs ResultSet 结果集对象
     */
    public static void close(Statement s, Connection c, ResultSet rs) {
        if(rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        close(s, c);
    }

    /**
     * 获取数据库连接池对象
     * @return 返回一个数据库连接池对象
     */
    public static DataSource getDataSource() {
       return ds;
    }
}

```

- main方法使用自定义的工具类类操作数据库

```
package com.liuhaoan.demo;

import com.liuhaoan.demo.utils.JDBCUtilPond;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Demo2_JDBCPond {
    public static void main(String[] args) {

        //方便释放资源
        Connection c = null;
        Statement state = null;
        ResultSet rs = null;

        try {
            //获取数据库连接对象
            c = JDBCUtilPond.getConnection();

            //获取sql语句执行对象
            state = c.createStatement();

            //定义sql语句
            String sql = "select * from emp;";

            //执行sql语句并且返回ResultSet结果集对象
            rs = state.executeQuery(sql);

            //遍历ename字段
            while (rs.next()) {
                String s = rs.getString("ename");
                System.out.println(s);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            //调用工具类方法释放资源
            JDBCUtilPond.close(state, c, rs);
        }
    }
}

```