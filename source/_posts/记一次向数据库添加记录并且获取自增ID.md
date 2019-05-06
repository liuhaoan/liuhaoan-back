---
title: 记一次向数据库添加记录并且获取自增ID
categories: JDBC
copyright: true
date: 2019-05-01 23:06:36
tags:
- sql添加记录获取自增ID
---

代码示例：使用了自定义的JDBC工具类
```
DataSource ds = JDBCUtil.getDataSource();
        String sql = "INSERT INTO user(id, username, password) VALUES (NULL, \"123\", \"123456\");";
        Connection conn = null;
        PreparedStatement stat = null;
        try {
            conn = ds.getConnection();
            stat = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            stat.executeUpdate();

            ResultSet rs = stat.getGeneratedKeys();
            while (rs.next()) {
                System.out.println(rs.getInt(1));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            JDBCUtil.close(stat, conn);
        }
```