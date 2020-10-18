package com.yang.interceptor;

import com.yang.pojo.Users;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.Enumeration;

import static com.yang.utils.Constant.LOGGED_FLAG;

/**
 * @auther YF
 * @create 2020-08-24-21:06
 */
public class SysInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("page=====> " + request.getRequestURI());
//        HttpSession session = request.getSession();
//        Users users = null;
//        boolean logged = (users = (Users) session.getAttribute(LOGGED_FLAG)) != null ||
//                (users = (Users) session.getServletContext().getAttribute(LOGGED_FLAG)) != null;
//        System.out.println("页面===> " + request.getRequestURI());
//        if (request.getRequestURI().toLowerCase().contains("login")) {
//            if (logged) {
//                request.getRequestDispatcher("/user/login?" +
//                        "email=" + users.getEmail() +
//                        "&password=" + users.getPassword()).forward(request, response);
//            }
//            return true;
//        } else {
//            if (logged) {
//                return true;
//            }
//            response.sendRedirect(request.getContextPath() + "/");
//            return false;
//        }

//        HttpSession session = request.getSession();
//        Users users = null;
//        String url = request.getRequestURI();
//        if ((users = (Users) session.getAttribute(LOGGED_FLAG)) != null ||
//                (users = (Users) session.getServletContext().getAttribute(LOGGED_FLAG)) != null) {
//            if (url.endsWith("/")) {
//                request.getRequestDispatcher("/user/login?" +
//                        "email=" + users.getEmail() +
//                        "&password=" + users.getPassword()).forward(request, response);
//            } else {
//                return true;
//            }
//        } else {
//            if (url.toLowerCase().contains("login")){
//                return true;
//            }
//            response.sendRedirect(request.getContextPath() + "/");
//        }
//        return false;
        return true;
    }

}
