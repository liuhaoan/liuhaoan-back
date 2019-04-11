---
title: javaSE复习之——JDK8新特性_Stream流练习
categories: JavaSE 复习
copyright: true
date: 2019-04-11 17:09:41
tags:
- Stream流练习
---
# 代码示例

<!--more-->

```
    /*1. 第一个队伍只要名字为3个字的成员姓名；存储到一个新集合中。
    2. 第一个队伍筛选之后只要前3个人；存储到一个新集合中。
    3. 第二个队伍只要姓张的成员姓名；存储到一个新集合中。
    4. 第二个队伍筛选之后不要前2个人；存储到一个新集合中。
    5. 将两个队伍合并为一个队伍；存储到一个新集合中。
    6. 根据姓名创建 Person 对象；存储到一个新集合中。
    7. 打印整个队伍的Person对象信息。
    */
    public static void main(String[] args) {
        //第一支队伍
        ArrayList<String> one = new ArrayList<>();
        one.add("迪丽热巴");
        one.add("宋远桥");
        one.add("苏星河");
        one.add("石破天");
        one.add("石中玉");
        one.add("老子");
        one.add("庄子");
        one.add("洪七公");
        Stream<String> s1 = one.stream().filter(name -> name.length() == 3).limit(3);

        //第二支队伍
        ArrayList<String> two = new ArrayList<>();
        two.add("古力娜扎");
        two.add("张无忌");
        two.add("赵丽颖");
        two.add("张三丰");
        two.add("尼古拉斯赵四");
        two.add("张天爱");
        two.add("张二狗");
        Stream<String> s2 = two.stream().filter(n -> n.startsWith("张")).skip(2);

        Stream<String> ss = Stream.concat(s1, s2);
        ss.forEach(n -> System.out.println(n));
    }
```