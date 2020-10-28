package com.yang.controller;

import com.yang.pojo.City;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @auther YF
 * @create 2020-08-24-18:58
 */
@Controller
public class PageController {
    @RequestMapping("/Login")
    public String login(){
        return "login";
    }

    @RequestMapping("/OfficeUser")
    public String searchFlight(){
        return "sysPage/officeUser";
    }

//    @RequestMapping("/SearchFlight")
//    public String sf(){
//        return "officeUser/searchFlights";
//    }
}
