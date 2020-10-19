<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: yf
  Date: 2020/8/25
  Time: 20:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>${param.title}</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/static/lib/layui/css/layui.css"/>

    <%
        for (int i = 0; i < Integer.parseInt(request.getParameter("cssSize") == null ? "0" : request.getParameter("cssSize") ); i++) {
    %>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}<%=request.getParameter("css" + i)%>"/>
    <%
        }
    %>
</head>
<body>
<l-init path="${pageContext.request.contextPath}"></l-init>