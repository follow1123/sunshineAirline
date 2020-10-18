<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: yf
  Date: 2020/8/25
  Time: 21:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:import url="../common/head.jsp">
    <c:param name="cssSize" value="2"/>
    <c:param name="css0" value="/static/css/foodServices.css"/>
    <c:param name="css1" value="/static/css/control/food.css"/>
</c:import>
<l-layout layout="1-10-1">
    <div>&nbsp;</div>
    <div>
        <div class="top">
        <l-form orientation="hor" style="padding: 10px;width: 100%" innerStyle="1 2>margin-right:5px;,4>float:right">
            <input type="radio" name="idType" value="Passport" title="Passport" checked>
            <input type="radio" name="idType" value="id card" title="ID Card">
            <input type="text" class="layui-input" name="idTypeNumber" placeholder="ID Type Number">
            <select name="flight" id="flightInfo">
                <option value="">Please Enter ID Type Number First</option>
            </select>
            <input type="submit" class="layui-btn" lay-submit lay-filter="load" value="Load">
        </l-form>
        </div>
        <div class="food-menu-container">
            <l-layout layout="8-4">
                <div class="food-menu">
                    <l-layout layout="4-4-4">
                        <div id="food-col0"></div>
                        <div id="food-col1"></div>
                        <div id="food-col2"></div>
                    </l-layout>
                </div>
                <div class="food-selected">2</div>
            </l-layout>
        </div>

    </div>
    <div>&nbsp;</div>
</l-layout>
<c:import url="../common/htmlTail.jsp">
    <c:param name="jsSize" value="1"/>
    <c:param name="js0" value="/static/js/foodServices.js"/>
</c:import>

