---
title: javaSE复习之——JDK8新特性_Stream流
categories: JavaSE 复习
copyright: true
date: 2019-04-11 15:31:42
tags:
- JDK8新特性
- Stream流
- forEach
---
# Stream流
> 说到Stream便容易想到I/O Stream，而实际上，谁规定“流”一定是“IO流”呢？
> 
> 在Java 8中，得益于Lambda所带来的的函数式编程，引入了一个**全新的Stream概念**，它关注的是做什么，而不是怎么做，**`用于解决已有集合类库所有的弊端`**

<!--more-->

### 案例
- 使用Stream流的方式过滤并且遍历集合
```
	    public static void main(String[] args) {
	        //创建一个List集合,存储姓名
	        List<String> list = new ArrayList<>();
	        list.add("张无忌");
	        list.add("周芷若");
	        list.add("赵敏");
	        list.add("张强");
	        list.add("张三丰");
	
	        //对list集合中的元素进行过滤,只要以张开头的元素,存储到一个新的集合中
	        //对listA集合进行过滤,只要姓名长度为3的人,存储到一个新集合中
	        //遍历listB集合
	        list.stream()
	            .filter(name->name.startsWith("张"))
	            .filter(name->name.length()==3)
	            .forEach(name-> System.out.println(name));
		}
```

### 流式思想概述
> 整体来讲，流式思想类似于车间的`“生产流水线”`
> 
> 当我们需要对多个元素进行操作（特别是多步操作）的时候，考虑到性能以及遍历性，我们应该首先拼好一个“模型”步骤的方案，然后再去按照这个方案去执行它。
> 
> 其实Stream流中的元素是一个特定类型的对象，这个类型由自己定义，可以通过泛型给它，在底层形成一个队列。
> 
> 并且在java中Stream并不会储存元素，而是按需计算。它数据源 流的来源可以是集合，数组等

>- ps：**“Stream流”其实是一个`集合元素的函数模型`，它并不是集合，也不是数据结构，其本身并不存储任何元素（或其地址值）。**

### 使用Stream流的步骤
> 1、获取一个数据源
> 
> 2、数据转换（如何转换、转换成什么自己定义）
> 
> 3、获取想要的结果
> 
>- ps：每次转换 原有的 Stream 对象不会改变，但是会返回一个新的 Stream 对象（可以有多次转换），这样就可以像链条一样的排列，可以理解为链式编程，也可以理解为linux系统中的 管道 “|” 命令。

### 获取一个Stream流

> java.util.stream.Stream<T>是java 8新加入的最常用的流接口（它不是函数式接口），我们使用Stream流都是通过它


- **获取一个Stream流有两种方式**
	> 1、所有的Collection 集合都可以通过stream()默认方法获取流
```
		//把集合转换为Stream流
		List<String> list = new ArrayList<>();
		Stream<String> stream1 = list.stream();
		
		Set<String> set = new HashSet<>();
		Stream<String> stream2 = set.stream();
		
		Map<String,String> map = new HashMap<>();
		//获取键,存储到一个Set集合中
		Set<String> keySet = map.keySet();
		Stream<String> stream3 = keySet.stream();
		
		//获取值,存储到一个Collection集合中
		Collection<String> values = map.values();
		Stream<String> stream4 = values.stream();
		
		//获取键值对(键与值的映射关系 entrySet)
		Set<Map.Entry<String, String>> entries = map.entrySet();
		Stream<Map.Entry<String, String>> stream5 = entries.stream(); 
```

	> 2、Stream接口中的 “of” 静态方法可以获取**数组**对应的流
```
		//把数组转换为Stream流
        Stream<Integer> stream6 = Stream.of(1, 2, 3, 4, 5);
        //可变参数可以传递数组
        Integer[] arr = {1,2,3,4,5};
        Stream<Integer> stream7 = Stream.of(arr);
        String[] arr2 = {"a","bb","ccc"};
        Stream<String> stream8 = Stream.of(arr2);
```

### Stream接口的常用方法
#### 延迟方法
> 返回值仍然是Stream接口自身类型对象，所以它支持链式调用

###### 1、过滤：filter
> 可以通过filter方法将`一个流`转换成另一个`子集流`
```
Stream<T> filter(Predicate<? super T> predicate);
```
> 它接收一个Predicate函数式接口（可以是一个Lambda或者方法引用），作为筛选条件

###### Predicate接口
> 它其中有一个抽象方法：test()；
> 
> 它会产生一个boolean，代表指定的条件是否满足，满足为true，这样Stream流的filter会留着当前元素，否则就放弃当前元素

###### 例子
```
import java.util.stream.Stream;
public class Demo07StreamFilter {
public static void main(String[] args) {
	Stream<String> original = Stream.of("张无忌", "张三丰", "周芷若");
	Stream<String> result = original.filter(s ‐> s.startsWith("张"));
	//结果：张无忌、张三丰
	}
}

```

###### 2、映射：map
> 如果需要将流中的元素映射到另一个流中，我们就需要使用到map方法
```
<R> Stream<R> map(Function<? super T, ? extends R> mapper);
```
> 此接口需要一个Function函数式接口的参数，可以把T类型数据转换成R类型数据

###### Function接口
> 它是一个函数式接口，它有一个抽象方法：R apply(T t);
> 它可以把T类型的数据转换为R类型的数据，这样就被称为“映射”

###### 例子
```
import java.util.stream.Stream;
public class Demo08StreamMap {
public static void main(String[] args) {
	Stream<String> original = Stream.of("10", "12", "18");
	//定义一个String类型的数组，然后获取它的Stream流

	Stream<Integer> result = original.map(str‐>Integer.parseInt(str));
	//把String类型的Stream流转换成Integer类型的Stream流
	}
}

```
###### 3、取用前几个元素：limit
> limit方法可以对流进行截取，只取用前n个,如果集合当前长度大于参数则进行截取,否则不进行操作
```
Stream<T> limit(long maxSize);
```
###### 例子
```
import java.util.stream.Stream;
public class Demo10StreamLimit {
public static void main(String[] args) {
	Stream<String> original = Stream.of("张无忌", "张三丰", "周芷若");
	Stream<String> result = original.limit(2);
	System.out.println(result.count()); 
	// 2
	}
}
```


###### 4、跳过前几个元素：skip
> 流中集合总数大于n才会跳过n个，否则会得到一个长度为0的空流
```
Stream<T> skip(long n);
```

###### 例子
```
import java.util.stream.Stream;
public class Demo11StreamSkip {
public static void main(String[] args) {
	Stream<String> original = Stream.of("张无忌", "张三丰", "周芷若");
	Stream<String> result = original.skip(2);
	System.out.println(result.count()); 
	// 1
	}
}

```

###### 5、组合：concat
> 如果有两个流想合并成一个流，那么就可以使用concat方法,它是一个静态方法

```
static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)
```
###### 例子
```
import java.util.stream.Stream;
public class Demo12StreamConcat {
public static void main(String[] args) {
	Stream<String> streamA = Stream.of("张无忌");
	Stream<String> streamB = Stream.of("张翠山");
	Stream<String> result = Stream.concat(streamA, streamB);
	}
}

```







#### 终结方法
> 返回的不是Stream接口自身类型对象了，所以不支持链式调用
###### 1、逐一处理：forEach
> 它虽然叫forEach，但是与for循环中的“for-each”是不同的
> ```
void forEach(Consumer<? super T> action);```
> - 该方法接收一个Consumer接口类型的函数，会将每一个流元素交给函数进行处理
###### 什么是Consumer接口？
> 它是一个消费型接口
> 接口中有一个抽象方法：accept(),它的意思是消费一个指定的泛型数据

###### 例子，遍历流中的数据
```
import java.util.stream.Stream;
public class Demo12StreamForEach {
public static void main(String[] args) {
	Stream<String> stream = Stream.of("张无忌", "张三丰", "周芷若");
	//从数组中获取Stream流

	stream.forEach(name‐> System.out.println(name));
	//利用forEach逐一处理Stream流中的每个数据
	}
}
```

###### 2、统计个数：count
> 正如Collection集合中的size方法一样，count它是数一数Stream流中的元素个数，`它返回一个long类型数据`

###### 例子
```
import java.util.stream.Stream;
public class Demo09StreamCount {
public static void main(String[] args) {
Stream<String> original = Stream.of("张无忌", "张三丰", "周芷若");
	Stream<String> result = original.filter(s ‐> s.startsWith("张"));
	System.out.println(result.count()); 
	// 2
	}
}

```


### Stream流的特点
- Stream流属于管道流，只能被消费（使用）一次
	> 第一个Stream流调用完方法后，数据就会被流转到下一个Stream上
	> 这时第一个Stream流已经使用完毕了，就会关闭了
	> 所以第一个Stream流就不能再调用方法了
	> 可以想象成一个流水线，它是一直流下去的，流下去就没了嘛。