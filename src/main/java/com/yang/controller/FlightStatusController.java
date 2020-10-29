package com.yang.controller;

import com.yang.service.FlightStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static com.yang.utils.ResultUtil.*;

/**
 * @auther YF
 * @create 2020-10-29-22:34
 */
@RestController
@RequestMapping("/FST")
public class FlightStatusController {

    private FlightStatusService flightStatusService;

    @Autowired
    @Qualifier("flightStatusServiceImpl")
    public void setFlightStatusService(FlightStatusService flightStatusService) {
        this.flightStatusService = flightStatusService;
    }
    @RequestMapping("/flightStatus")
    public String getFlightStatus(String date){
        if (null == date) {
            return pack(400, "");
        }
        return pack(()->flightStatusService.getFlightStatus(date));
    }
}
