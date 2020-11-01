# PageController

#### 提供单独页面的访问

* `/Login`：跳转到用户登录页面
* `/OfficeUser`：跳转到普通用户页面
* `/Administrator`：跳转到管理员页面

# UserController

#### 提供user页面需要的api接口

* `/user/login`：
  * 登录api，传递用户名、密码等参数，判断是否登录成功，并放回结果
* `/user/logout`：
  * 注销api，注销当前用户并执行相应操作

#  SearchFlightController

#### 提供SearchFlight页面需要的api

* `/sf/search`：
  * 查询，更具转递的出发城市、到的城市等参数查询机票并返回