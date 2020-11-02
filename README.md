# sunshineAirline
 #航班查询管理项目
# 记录自己开发项目的过程
## 记录
###  2020-10-18:
* 第一次正式接触git版本控制工具，将自己目前正在练手的项目记录下来，这个项目从8月份开始创建至今
由于时间和个人能力问题，这个项目进展的非常缓慢，该项目使用Spring+SpringMVC+Mybatis，前端主要
使用layui，在之前的几个月内前端的代码经过了几次大型的重构，最初使用纯jsp页面，使用session、cookie
传递数据，但由于实现复杂点的页面的方式太过臃肿，改为jsp页面就跳转使用，页面内所需的使用传递json数据
实现，因为页面过多，导入css、js文件过于麻烦，最后将页面全部重构为html页面，获取数据全部使用后端传递
的json数据将每种角色的页面单独写成一个页面，其中单独的功能页面使用srcipt模板插入，之后也会将这种方式
逐渐完善。
* 今天功能实现：
    * 将查询航班页面部分重构，重写ticket、ticketdetail控件使这两个控件能更好的配合
### 2020-10-19：
* 因为使用git还不熟练（在idea内使用集成的工具），把项目里所有该push不该push的全部push上来了，手残了
  之后还需要多熟悉下git
* 今日功能实现：
    * 添加航班查询页面的部分功能，完善ticketdetail控件，添加一个页面内的页面模板切换事件，当页面模板切换时
   将该页面内的操作保存，页面切换回来时可以显示之前操作的步骤，因为时间原因，还有点bug，明天再改
### 2020-10-20:
* 将昨天的烂摊子收拾了一下，把不用push上去的文件全部删除了，昨天晚上还有一个bug未解决，其实那个bug很简单
就是加载顺序的问题，我在页面最前面就把之前保存的数据填上去了，那时候页面还没渲染完成，我测试的时候是直接在
浏览器控制台测试的，那时候当然可以，因为页面已经渲染完成了。又一次犯了这种低级错误
* 今日功能实现：
    * 调整了一下模板切换保存数据的功能（这个功能需要等多个页面完成后才能继续完善），重写了food services页面
     实现了加载航班号功能，编写Food控件实现页面加载时把食物的数据全部加载上，改了一下食物框的样式，设置购买图标
     的动画效果。
     
### 2020-10-21:
* 今天将项目里面的文件整理了一下，把之前写的旧版本的代码全部删除了，之前没有使用git的时候，舍不得把之前写的
代码删掉，虽然写的烂了点，但也是辛辛苦苦写出来的，现在使用git push上去都有记录，好用就完事了。
* 今日功能实现：
    * 编写FoodChoose控件，实现Food控件的购买按钮点击，侧边购物车显示被选择的食物信息，可以进行添加或删除。
### 2020-10-22：
* 今日功能实现：
    * 完成食物服页面的前端操作功能，包括优化昨天的FoodChoose控件，添加食物总计区域，将食物总计区域的数据与
FoodChoose控件内的操作关联起来。这个页面的前端操作功能已全部实现，明天开始操作数据库实现食物加载、预订功能。
### 2020-10-23：
* 今日实现功能：
    * 昨天将食物信息总计区域功能封装为一个对象，今天将该对象添加自动生成选择的食物信息对象例如{foodId: 4, 
amount: 1, price: 65},{foodId: 11, amount: 5, price: 625}……跟后台数据库添加的方式对应，编写后台对食物
预订信息表的增、删、查操作，以及对应的各个层级
* 这几天都在写js，回到写java，感觉有点不适应了，像是从一个开放世界到了充满拘束的世界一样，但是在写js时对我的
启发也很多，其实实现一个功能的方式不止一两种，在js这里只要你想的出来就实现的了，这让我想起了初学编程语言的时候
无论时老师上课还是看网上的教学视频，总是有一个问题，和一个答案在旁边，我们总是在绞尽脑汁的向这个答案靠齐，也与
正是这种思维限制了我们的进步。说到底其实js或java或其他语言都一样，只是场景不同罢了，还是继续完成我的项目吧。
### 2020-10-24:
* 今日实现功能：
    * 优化食物总计区域操作对象。
* 首先，祝自己节日快乐，我应该能算是个程序员吧，今天本来是想实现查询后台数据库的一些操作的，启动项目想玩一玩食物
服务页面，结果被我玩出了bug，打开代码一看写的乱七八糟的，我自己都看不下去了，重复的代码每个方法都有，把实现一个
功能的代码全部都丢在一个方法内，我又想了想之前的习惯也不难解释我这样的操作，我每次编写一个页面时都是想到哪写到哪
从来都没有提前思考过页面内的功能该怎组合，就是从上往下看到那个控件就实现那个控件的功能，这使我养成了一个编码的习惯
：`实现功能1->调试该功能并找bug->修复bug->实现功能2->调试该功能并找bug->修复bug->将功能1和功能2组合起来->调试该
功能并找bug->找出一堆bug->关机`，这习惯居然还***有结构性……，这应该就是做事不先想清楚的后果，明明我可以先分析该页面
的业务逻辑后分配并组织好这个页面的每个控件最后编写代码的，但是我偏偏就陷入了边写代码边改bug的死循环内，可能这就是大佬
与我的差别之处吧，我又想了想，我最开始编写这个项目的时候，前端结构重构了一遍又一遍，那时候我只觉得和我前端的知识结构
不完善有关，而那时候并没有意识到这个问题，这可能是记录给我带来了好处吧
### 2020-10-26：
* 今日未实现功能，只是将部分页面的流程梳理了一遍，流程为markdown格式，放在view文件夹内。
* 经过昨天的休息和整理，我决定更改我编写代码的习惯，改正之前编码时的缺点。编码时先将页面或功能流程完整梳理下来，再动手，
尽量达到功能实现一遍，优化一遍，不再陷入那个死循环。
### 2020-10-27：
* 今日实现功能：
    * 实现food services页面的确认预订食物按钮，选择航班、食物后点击按钮将已选择的所有食物存入对应id号的食物信息数据库内，具体实现方
    式梳理在页面流程文件内，编写了后台的添加预订食物api接口（目前主要是在编写前端，所有后端的接口都是随便写了写，能用就行，等前端页面
    编写完了再着重重构并优化后端，毕竟java才是我的主场）。
* 在昨天的页面梳理完成后今天进入状态的速度快了些，感觉像是有前情回顾，不会像之前打开项目看一会代码再想接下来该写什么这么低效，今天
编写功能时也遇到了一些之前的问题，就是之前的一个控件没规划好，今天又把那个控件里面的部分功能重构了一下，导致今天该实现的功能只是
完成了，明天还要优化。在调用之前写工具类时发现了一个老bug，之前没发现过，不过庆幸的是那很老的代码没写注释我居然看得懂，然后很快就
把bug定位修复掉了，这几天有错误也有提升，慢慢来吧。
### 2020-10-28：
* 今日功能实现：
    * 实现food services页面的加载已预订食物功能。
* 今天编写的这个功能算是food services页面的最后一个功能了，编写时也将项目其他不合理的位置改了改，接下来就是flight status页面了，将该
页面的大概需要实现的功能，大多时一些关于表格的操作了，这个layui已经封装好了，明天啃啃layui的表格模块。
### 2020-10-29:
* 今日功能实现：
    * 今天将layui的table啃了一下，感觉还行，功能很全面，我要用的功能只有一点，试了一下table的用法后将航班状态页面的大致布局编写了一下
    编写获取航班状态信息数据的后端接口。
* 今天在编写查询航班状态信息数据sql时发现了sql几个有用的内置函数，之间居然没注意，就是日期转换、日期添加减少，这些函数直接在sql语句层
面编写就不用到前端来转换来转换去了。
### 2020-10-31：
* 今日实现功能：
    * 完成用户信息的航班状态（flight status）页面，至此普通用户的页面已全部实现，完成管理员的航班计划管理页面的大部分功能。
* 今天因为时间充足，算是完成了两个页面，这两个页面的功能高度相似，大部分时间是在编写后台的接口和整理项目内文件的分布，感觉后台的大部分
代码太烂了，又不敢随便更改，后端没更改一次都有重写发布项目等个变天，感觉大部分时间都是浪费在这里了，还记得之前android开发时那滋味，开
软件开个几分钟，开模拟器开个几分钟，写的时候都头疼，是要准备个时间优化优化后端了。
### 2020-11-1:
* 今日实现功能：
    * 实现航班计划管理页面的confirm或cancel按钮功能，轻微调整了一下后端的各个模块
* 今天准备是把那个点击航班信息的detail显示具体信息的功能实现的，但那个具体信息页面的座位表有点复杂，暂时没想好怎么写就只写了个半头子，
今天观察了一下我的后端的情况并改了一下，因为我spring+springMVC+mybatis只学了一遍，就跟着视频上项目模仿了项目内文件的布局，然后今天在
github上找个几个ssm的项目看了看里面的文件布局，就更改了一下，前端到现在为止算是编写了一半了，感觉现在可以放一放了，把后端代码先优化一
下。
### 2020-11-02:
* 今天开始优化后端，从后端的数据库层开始优化，决定拆分联表查询sql语句、编写一个工具类进行sql联表查询，具体进度我会另开一个项目进行记录
这个项目先停一段时间。