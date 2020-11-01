package com.yang.service;

import com.yang.vo.FlightScheduleInfo;

import java.util.List;
import java.util.Map;

/**
 * @auther YF
 * @create 2020-10-31-16:57
 */
public interface FlightScheduleManagementService {

    List<String> getIATACode();
    List<String> getCityNames();
    List<FlightScheduleInfo> getFlightSchedule(Map<String, Object> map);

    int setStatus(Integer scheduleId, String status);

    List<Map<Integer, List<String>>> getAllSeatById(Integer schedule);
}
