---
title: JDBC之——Spring JDBC_JDBCTemplate封装类
categories: JDBC
copyright: true
date: 2019-04-29 15:30:42
tags:
- Spring JDBC
- JDBCTemplate
---
# Spring JDBC 简介
> Spring 框架对JDBC的简单封装，它提供了一个JDBCTemplate类，用于简化JDBC的开发

### 实现步骤
> 1、导入jar包
> - commons-logging-1.2.jar
> - spring-beans-5.0.0.RELEASE.jar
> - spring-core-5.0.0.RELEASE.jar
> - spring-jdbc-5.0.0.RELEASE.jar
> - spring-tx-5.0.0.RELEASE.jar
> 
> 2、创建jdbcTemplate对象
> - `jdbcTemplate jt = new jdbcTemplate(数据库连接池对象);`
> 
> 3、调用jdbcTemplate的方法来完成CRUD操作（就是数据库的各种操作）
> - updata()：执行DML语句，增删改
> - quryForMap()：查询结果，并将结果封装为map集合
> - queryForList()：查询结果，并将结果封装成map泛型的list集合
> - query()：查询结果，将结果封装为JavaBean对象
> - queryForObject()：查询结果，将结果封装成对象,通常用来执行聚合函数

<!--more-->
#### 案例
- jdbcTemplate简单实现
```
//获取JDBCTemplate对象
jdbcTemplate t = new jdbcTemplate(JDBCUtilPond.getDataSource());

//定义sql
String sql = "update emp set salary = 1000 where id = ? and id = ?;"

//执行sql（id为2和3的记录的 salary 字段值改为1000）
int count = t.update(sql, 2， 3)

System.out.pringln("影响的数据条目数：" + count);
```

- 查询结果，并且**手动创建实现类**封装成JavaBrean对象

```
        String sql = "select * from emp";
        List<Emp> list = template.query(sql, new RowMapper<Emp>() {

            @Override
            public Emp mapRow(ResultSet rs, int i) throws SQLException {
                Emp emp = new Emp();
                int id = rs.getInt("id");
                String ename = rs.getString("ename");
                int job_id = rs.getInt("job_id");
                int mgr = rs.getInt("mgr");
                Date joindate = rs.getDate("joindate");
                double salary = rs.getDouble("salary");
                double bonus = rs.getDouble("bonus");
                int dept_id = rs.getInt("dept_id");

                emp.setId(id);
                emp.setEname(ename);
                emp.setJob_id(job_id);
                emp.setMgr(mgr);
                emp.setJoindate(joindate);
                emp.setSalary(salary);
                emp.setBonus(bonus);
                emp.setDept_id(dept_id);

                return emp;
            }
        });


        for (Emp emp : list) {
            System.out.println(emp);
        }
```

- 查询结果，使用**jar包自带实现类**封装成JavaBrean对象
	> query参数：RomMapper
	> 一般我们使用BeanProPertyRowMapper实现类，可以完成数据到JavaBean的自动封装 

```
        String sql = "select * from emp";
        List<Emp> list = template.query(sql, new BeanPropertyRowMapper<Emp>(Emp.class));
        for (Emp emp : list) {
            System.out.println(emp);
        }
```

- queryForObject查询记录总数

```
        String sql = "select count(id) from emp";
        Long total = template.queryForObject(sql, Long.class);
        System.out.println(total);
```