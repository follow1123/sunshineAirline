package com.yang.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


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
    public String officeUser(){
        return "sysPage/officeUser";
    }
    @RequestMapping("/Administrator")
    public String administrator(){
        return "sysPage/administrator";
    }

//    @RequestMapping("/SearchFlight")
//    public String sf(){
//        return "officeUser/searchFlights";
//    }
}
