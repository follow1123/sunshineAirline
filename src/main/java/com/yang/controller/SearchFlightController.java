package com.yang.controller;

import com.yang.vo.Ticket;
import com.yang.vo.TransitTicket;
import com.yang.service.impl.SearchFlightServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.HashMap;
import java.util.List;

import static com.yang.utils.ResultUtil.*;

/**
 * @auther YF
 * @create 2020-08-24-18:54
 */
@RestController
@RequestMapping("/SF")
public class SearchFlightController {
    private SearchFlightServiceImpl searchFlightService;

    @Autowired
    public SearchFlightController(SearchFlightServiceImpl searchFlightService) {
        this.searchFlightService = searchFlightService;
    }

    @RequestMapping("/search")
    public String searchTicket(String from, String to, String date) {
        int code = 200;
        HashMap<String, List> allTicket = null;
        try {
            List<Ticket> oneWayTickets = searchFlightService.searchOneWayTickets(from, to, date);
            List<TransitTicket> transitTickets = searchFlightService.searchTransitTickets(from, to, date);
            allTicket = new HashMap<String, List>() {
                {
                    put("None Stop", oneWayTickets);
                    put("One Stop", transitTickets);
                }
            };
        } catch (Exception e) {
            e.printStackTrace();
            allTicket = null;
            code = 500;
        } finally {
            if (allTicket != null &&
                    allTicket.get("None Stop").size() == 0 &&
                    allTicket.get("One Stop").size() == 0) {
                code = 404;
            }
        }
        return pack(code, allTicket);
    }

    @RequestMapping("/cityName")
    public String getCityName() {
        return pack(searchFlightService::getCityName);
    }


}
