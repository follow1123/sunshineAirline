package com.yang.controller;

import com.yang.service.FlightScheduleManagementService;
import com.yang.utils.RequestParamUtils;
import com.yang.utils.ResultUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.yang.utils.ResultUtil.*;

/**
 * @auther YF
 * @create 2020-10-31-16:50
 */
@RestController
@RequestMapping("/FSM")
public class FlightScheduleManagementController {

    private FlightScheduleManagementService flightScheduleManagementService;

    @Autowired
    public void setFlightScheduleManagementService(FlightScheduleManagementService flightScheduleManagementService) {
        this.flightScheduleManagementService = flightScheduleManagementService;
    }

    @RequestMapping("/cityNames")
    public String cityNames() {
        return pack(flightScheduleManagementService::getCityNames);
    }

    @RequestMapping("/IATACode")
    public String IATACode() {
        return pack(flightScheduleManagementService::getIATACode);
    }

    @RequestMapping("/flightSchedule")
    public String flightSchedule(String cFrom, String cTo, String aFrom, String aTo, String date) {
        HashMap<String, Object> params = new HashMap<String, Object>() {{
            put("cFrom", cFrom);
            put("cTo", cTo);
            put("aFrom", aFrom);
            put("aTo", aTo);
            put("date", date);
        }};

        return pack(() -> flightScheduleManagementService.getFlightSchedule(params));
    }

    @RequestMapping("setStatus")
    public String setStatus(Integer scheduleId, String status) {
        if (null == scheduleId || status == null) {
            return packBadRequest();
        }
        return pack(() -> flightScheduleManagementService.setStatus(scheduleId, status));
    }

    @RequestMapping("getSeats")
    public String getSeats(Integer id) {
        RequestParamUtils.notNoll(id);
        return ResultUtils.pack(() -> {
            HashMap<String, Object> map = new HashMap<>();
            List<Map<String, Object>> allSeats = flightScheduleManagementService.getSeats(id);
            List<Map<String, Object>> soldSeats = flightScheduleManagementService.getSeats(id, true);
            map.put("allSeats", allSeats);
            map.put("soldSeats", soldSeats);
            return map;
        });
    }

    @RequestMapping("getScheduleInfo")
    public String getScheduleInfo(Integer id) {
        RequestParamUtils.notNoll(id);
        return ResultUtils.pack(() -> flightScheduleManagementService.getScheduleInfo(id));
    }
}
