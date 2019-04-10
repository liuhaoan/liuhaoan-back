---
title: javaSE复习之——多线程_Timer类
categories: JavaSE 复习
copyright: true
date: 2019-04-10 17:22:31
tags:
- 多线程
- Timer类
---
# Timer的概述
> 它其实就是一个`计时器`，线程可以用它安排以后在后台执行的任务，可以安排执行一次，或者定期重复执行，**可以把它想象成一个闹钟**。

<!--more-->

### 使用方法
> 创建一个定时任务类，继承TimerTask类，然后在主方法创建Timer对象并且传入任务类对象和要执行的时间，如果需要第一次执行之后果断时间继续重复执行，那么就在第三个参数传入一个等待时间


### 使用方法案例
```
public class Test13_Timer {
    public static void main(String[] args) {
        Timer t = new Timer();
        Calendar c = Calendar.getInstance();
        c.set(Calendar.MINUTE, 56);
        t.schedule(new tesk(), c.getTime());
    }
}
class tesk extends TimerTask {

    @Override
    public void run() {
        System.out.println("定时任务11111");
    }
}
```