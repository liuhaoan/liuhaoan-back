---
title: 网络攻防之——Python实现MD5加密
categories: 网络攻防
copyright: true
date: 2019-04-08 10:27:04
tags:
- MD5加密
- Python
---

# 代码示例：

```
#!/usr/bin/python3
import hashilb

str = input(“请输入要解密的字符串：”)
md5 = hashlib.md5()
//创建MD5加密对象

md5.update(str.encode("utf-8"))
//把字符串以“utf-8”编码的形式传给MD5对象进行MD5加密

print(md5.hexdigest())
//获取MD5加密后的16进制输出打印
```