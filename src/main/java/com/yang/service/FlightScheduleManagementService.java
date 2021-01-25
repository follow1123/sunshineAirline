package com.yang.service;

import com.yang.vo.FlightScheduleInfo;
import org.apache.ibatis.annotations.Param;

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

    List<Map<String, Object>> getSeats(Integer id, Boolean sold);

    List<Map<String, Object>> getSeats(Integer id);

    Map<String, Object> getScheduleInfo(Integer id);

}
