<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: yf
  Date: 2020/8/23
  Time: 15:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:import url="common/htmlHeader.jsp">
    <c:param name="title" value="Login"/>
    <c:param name="cssSize" value="1"/>
    <c:param name="css0" value="/static/css/login.css"/>
</c:import>

<l-layout layout="4-4-4">
    <div>&nbsp;</div>
    <div>
        <l-form orientation="ver" style="padding: 20px;"
                innerStyle="0 1 2>margin-bottom:10px;margin-left:0;,3>margin-top:50px;margin-left:0;">
            <h1>Login</h1>
            <input type="text" name="email"
                   required lay-verify="email"
                   placeholder="Email" autocomplete="off"
                   class="layui-input">
            <input type="password" name="password"
                   required lay-verify="password"
                   placeholder="Password"
                   autocomplete="off" class="layui-input">
            <div>
                <input type="submit" class="layui-btn layui-btn-sm" style="float: right" lay-submit lay-filter="login" value="Login">
                <input type="checkbox" name="auto" style="border-radius: 5px" title="AutoLogin">
            </div>
        </l-form>
    </div>
    <div>&nbsp;</div>
</l-layout>
<c:import url="common/htmlTail.jsp">
    <c:param name="jsSize" value="1"/>
    <c:param name="js0" value="/static/js/login.js"/>
</c:import>

