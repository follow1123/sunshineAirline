<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: yf
  Date: 2020/8/24
  Time: 20:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:import url="/WEB-INF/jsp/common/htmlHeader.jsp">
    <c:param name="title" value="${headInfo.head}"/>
</c:import>
<ul class="layui-nav" lay-filter="">
    <c:forEach var="title" items="${headInfo.titles}">
        <li class="layui-nav-item"><a href="${pageContext.request.contextPath}${title.value}">${title.key}</a></li>
    </c:forEach>
    <li class="layui-nav-item" style="float: right">
        <a href="javascript:;">${headInfo.username}</a>
        <dl class="layui-nav-child">
            <dd><a href="">home</a></dd>
            <dd><a href="${pageContext.request.contextPath}/user/logout">logout</a></dd>
        </dl>
    </li>
</ul>

