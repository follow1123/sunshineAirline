<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: yf
  Date: 2020/8/25
  Time: 20:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="${pageContext.request.contextPath}/static/lib/jquery-3.4.1.js"></script>
<script src="${pageContext.request.contextPath}/static/lib/layui/layui.all.js"></script>
<script src="${pageContext.request.contextPath}/static/js/utils/customElement.js"></script>
<%
    for (int i = 0; i < Integer.parseInt(request.getParameter("jsSize") == null ? "0" : request.getParameter("jsSize") ); i++) {
%>
<script type="module" src="${pageContext.request.contextPath}<%=request.getParameter("js" + i)%>"></script>
<%
    }
%>
</body>
</html>
