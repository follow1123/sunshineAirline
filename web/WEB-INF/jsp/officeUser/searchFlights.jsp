<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: yf
  Date: 2020/8/23
  Time: 18:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:import url="../common/head.jsp">
    <c:param name="cssSize" value="1"/>
    <c:param name="css0" value="/static/css/control/ticket.css"/>
</c:import>
<l-layout layout="1-10-1">
    <div>&nbsp;</div>
    <div style="padding-top: 10px">
        <%--        搜索栏表单--%>
        <l-form orientation="hor" innerStyle="0 1>margin-right:5px,3>float:right">
            <select name="from" id="from">
                <option value="">Departure City</option>
            </select>
            <select name="to" id="to">
                <option value="">Arrival City</option>
            </select>
            <l-datepicker id="datePicker" name="date" class="layui-input" placeholder="Date" readonly></l-datepicker>
            <input type="submit" lay-submit lay-filter="search" id="search" class="layui-btn layui-btn-normal"
                   value="Search">
        </l-form>
        <l-layout layout="7-5" style="padding-top: 10px">
            <div>
                <%--            查询到的票显示区域--%>
                <div id="tickets" class="ticket-container"></div>
                <div>
                    <%--    上一天选择按钮--%>
                    <div class="layui-input-inline">
                        <input type="button" day="-86400000" value="pre day" class="layui-btn">
                    </div>
                    <%--    下一天选择按钮--%>
                    <div class="layui-input-inline" style="float: right">
                        <input type="button" day="86400000" value="next day" class="layui-btn">
                    </div>
                </div>
            </div>
            <div>
                <%--                票的详细信息显示区域--%>
                <div id="ticket-detail" class="ticket-detail-area"></div>
                <l-form orientation="hor" innerStyle="0>margin-left:10px,3>float:right;margin-top:10px">
                        <input type="radio" spread="1.5" name="cabinType" value="First"
                               title="First" lay-filter="cabinType" disabled>
                        <input type="radio" spread="1.25" name="cabinType" value="Business"
                               title="Business" lay-filter="cabinType" disabled>
                    <input type="radio" spread="1" name="cabinType" value="Economy"
                           title="Economy" lay-filter="cabinType" disabled>
                    <input type="submit" value="buy" lay-submit lay-filter="buyTicket" class="layui-btn">
                </l-form>
            </div>
        </l-layout>
    </div>
    <div>&nbsp;</div>
</l-layout>

<c:import url="../common/htmlTail.jsp">
    <c:param name="jsSize" value="1"/>
    <c:param name="js0" value="/static/js/page/searchFilght.js"/>
</c:import>

