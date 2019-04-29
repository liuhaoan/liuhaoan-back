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
> 它是一个静态sql，有sql注入漏洞
- boolean execute(sql) : 它可以执行任何静态方法，但不是很长用
- int execteUpdate(sql) : 可以执行 DML增删改 、DDL(create、alter、drop。。)
	> 返回值是影响的行数，可以用来判断是否执行成功

- ResultSet executeQuery(sql) ： 执行DQL(select)语句
	> 用来执行查询语句，返回一个ResultSet对象，平时很常用



###  ResultSet ： 结果集对象
- next() : 向下获取一行，返回boolean
- getXXX() ：获取数据
	> XXX代表数据类型
	> 
	> 参数：
	> - int ：代表列的编号，从1开始（1代表获取第一列的值）
	> - String ：代表列的名称



### PreparedStatement ： 执行sql的对象，我们以后用的都是它，他可以防止sql注入
> 它是一个预编译sql，解决了sql注入问题
> 
> 预编译sql：参数使用？作为占位符

#### 使用方法
> 1、导入jar包：添加libs文件夹，然后右键 --> Add as library
> 2、注册驱动
> 3、获取数据库连接对象（connection）
> 4、定义sql语句（用?作为占位符）
> 5、获取执行sql语句的对象：PreparedStatement
> 6、给`?`赋值：`setXXX(?位置1开始， ?的值)`
> 6、执行sql，接收返回结果，不需要传递sql语句
> 7、处理结果
> 8、释放资源


### JDBC查询练习
- 定义一个自定义引用数据类型,用来装某个表中的每一条数据

```
@SuppressWarnings("all")
public class Emp {
    //代表每个字段
    private int id;
    private String ename;
    private int job_id;
    private Date joindate;
    private double salary;
    private double bonus;
    private int dept_id;

    public Emp() {
    }

    public Emp(int id, String ename, int job_id, Date joindate, double salary, double bonus, int dapt_id) {
        this.id = id;
        this.ename = ename;
        this.job_id = job_id;
        this.joindate = joindate;
        this.salary = salary;
        this.bonus = bonus;
        this.dept_id = dept_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return ename;
    }

    public void setName(String name) {
        this.ename = name;
    }

    public int getJob_id() {
        return job_id;
    }

    public void setJob_id(int job_id) {
        this.job_id = job_id;
    }

    public Date getJoindate() {
        return joindate;
    }

    public void setJoindate(Date joindate) {
        this.joindate = joindate;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public double getBonus() {
        return bonus;
    }

    public void setBonus(double bonus) {
        this.bonus = bonus;
    }

    public int getDapt_id() {
        return dept_id;
    }

    public void setDapt_id(int dapt_id) {
        this.dept_id = dapt_id;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "id=" + id +
                ", name='" + ename + '\'' +
                ", job_id=" + job_id +
                ", joindate=" + joindate +
                ", salary=" + salary +
                ", bonus=" + bonus +
                ", dapt_id=" + dept_id +
                '}';
    }
}

```

- 读取数据库表，并且保存到集合中


```
        Connection conn = null;
        Statement stat = null;
        ResultSet rs = null;
        ArrayList<Emp> empList = new ArrayList<>();

        try {
            //注册mysql驱动，mysql5版本以后可以不用注册，但是为了向下兼容，建议写上注册驱动
            Class.forName("com.mysql.jdbc.Driver");

            //获取数据库连接对象
            conn = DriverManager.getConnection("jdbc:mysql://192.168.220.160/db1",
                    "root", "123456");

            //获取数据库的sql执行对象
            stat = conn.createStatement();

            //定义sql语句
            String sql = "select * from emp;";

            //执行sql语句
            rs = stat.executeQuery(sql);

            Emp empTemp = null;
            while (rs.next()) {
                empTemp = new Emp(rs.getInt("id"),
                        rs.getString("ename"),
                        rs.getInt("job_id"),
                        rs.getDate("joindate"),
                        rs.getDouble("salary"),
                        rs.getDouble("bonus"),
                        rs.getInt("dept_id"));
                empList.add(empTemp);
            }
            System.out.println(empList);
            System.out.println(empList.size());


        } catch (Exception e) {
            e.printStackTrace();
        }finally {

            //释放资源需要从后向前释放，也就是对象后创建先释放，先创建后释放

            if(rs != null) {
                try {
                    rs.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            if(stat != null) {
                try {
                    stat.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }

            if(conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
```


### JDBC控制事务
> 事务：一个包含多个步骤的操作，如果某些操作被事务管理，要么全部执行成功，要么全部执行失败。
> 
> 操作：
> - 开始事务
> - 提交事务
> - 回滚事务

#### 使用Connection对象来管理事务
> 开启事务：void setAutoCommit(boolean b) ：false代表关闭自动提交，即开启事务
> 执行sql之前执行
> 
> 提交事务：commit() ： 提交事务（执行完所有sql语句后执行）
> 回滚事务：rollack() : 撤销事务，回滚事务（在catch中回滚）