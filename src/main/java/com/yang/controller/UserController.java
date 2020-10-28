package com.yang.controller;

import com.yang.vo.HeadInfo;
import com.yang.pojo.Users;
import com.yang.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import static com.yang.utils.Constant.*;
import static com.yang.utils.ResultUtil.*;

/**
 * @auther YF
 * @create 2020-08-23-18:00
 */
@Controller
@RequestMapping("/user")
public class UserController {

    public UserServiceImpl userServiceImpl;

    @Autowired
    @Qualifier("userServiceImpl")
    public void setUserService(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }
    @ResponseBody
    @RequestMapping("/login")
    public String login(String email, String password, String auto, HttpSession session, HttpServletResponse resp) {
        int code = 200;
        Users users = null;
        try {
            users = userServiceImpl.verification(email, password);
            if (users != null) {
                if (auto != null) {
                    session.getServletContext().setAttribute("user", users);
                } else {
                    session.setAttribute("user", users);
                }
                String username = users.getFirstName() + " " + users.getLastName();
                HeadInfo headInfo = users.getRoleId() == 1 ?
                        new HeadInfo("Office User", OFFICE_USER_TITLES, username) :
                        new HeadInfo("Administrator", ADMINISTRATOR_TITLES, username);
                session.setAttribute("headInfo", headInfo);
            } else {
                code = 404;
            }
        }catch (Exception e){
            e.printStackTrace();
            code = 500;
        }
        return pack(code, users == null ? "" : users.getUserId());
    }

    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("headInfo");
        if (session.getAttribute(LOGGED_FLAG) != null) {
            session.removeAttribute(LOGGED_FLAG);
        } else if (session.getServletContext().getAttribute(LOGGED_FLAG) != null) {
            session.getServletContext().removeAttribute(LOGGED_FLAG);
        }
        return "redirect:/Login";
    }
}
