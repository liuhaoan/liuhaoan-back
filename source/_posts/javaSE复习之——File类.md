---
title: javaSE复习之——File类
categories: JavaSE 复习
copyright: true
date: 2019-04-10 14:54:23
tags:
- File类
---
# File的概述
> 它是文件或者目录的抽象表现形式，其实File更应该叫做一个路径，分为文件路径和文件夹路径，路径分为相对路径和绝对路径。

### Flie的实例化
- File(pathname)	
	> 直接根据一个路径得到File对象
- File(parent，child)
	> parent是父级路径，child是子文件或者文件夹，在一个目录下我们需要处理多个子文件或文件夹时可以更方便
- File(file, child)
	> file是一个File对象，chile是子文件或文件夹，封装成File传入更加强大，可以用到File类中的功能

<!--more-->

### File类的方法
- .exists()
	> 判断文件是否存在，存在true
- .createNewFile()
	> 判断是否存在某个文件，不存在创建返回true，存在返回false
- .mkdir()
	> 创建文件夹成功返回true，不成功返回false
- .mkdirs()
	> 创建多级文件夹
- .renameTo(file)
	> 把文件重命名为指定路径
	> 
	> - 注意事项：
	> 1、如果路径名相同，那就是改名
	> 2、如果路径名不同，那就是改名并且剪切
- .delete()
	> 删除文件或者文件夹
	> 
	> - 注意事项：
	> 1、Java中的删除不走回收站
	> 2、只能说删除空的文件夹，如果文件夹里面还有内容，就需要遍历一个一个删除

### File类的判断方法
- .isDirectory()	
	> 判断是否是目录
- .isFile()
	> 判断是否是文件
- .exists()
	> 判断是否存在
- .canRead()	
	> 判断是否可读
	> - ps：
	> windows系统的所有文件都是可读的，linux系统就可以不能读
- .canWrite()
	> 判断是否可写
- .isHidden()
	> 判断是否隐藏


### File类的获取方法
- .getAbsolutePath()
	> 获取绝对路径（包括盘符的路径）
- .getPath()
	> 获取路径（构造File方法时传入的路径）
- .geName()
	> 获取名称
- .length()
	> 获取长度（字节数）
- .lastModified()
	> 获取最后一次修改时间（毫秒值）
- .list()
	> 获取目录下所有文件或文件夹名称，返回一个String数组
- .listFiles()
	> 获取目录下所有文件或文件夹名称，返回一个File数组


### 文件名称过滤器FilenameFilter概述
> 通过重写FilenameFilter类中的accept方法，然后调用list方法获取所有文件时传入可以达到过滤文件的目的

- 示例：

```
		String[] arr = dir.list(new FilenameFilter() {

			@Override
			public boolean accept(File dir, String name) {
				File file = new File(dir, name);
				return file.isFile() && file.getName().endsWith(".jpg");
				//重写的accept方法一直返回true则获取到所有文件和文件夹，返回falst则不获取那个文件或者文件夹
			}
		});
		
		for (String string : arr) {
			System.out.println(string);
		}
```


### 利用递归获取.java结尾的文件：
```
    public static void main(String[] args) {
        getFile(new File(".\\"));

    }
    public static void getFile(File f) {
        File[] farr = f.listFiles();

        for(File name : farr) {
            if(name.isFile() && name.getPath().endsWith(".java")) {
                System.out.println(name.getName());
            }else if(name.isDirectory()){
                getFile(name);
            }
        }
    }

```