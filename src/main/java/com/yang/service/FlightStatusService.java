package com.yang.service;

import com.yang.vo.FlightStatusInfo;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-29-22:29
 */
public interface FlightStatusService {
    List<FlightStatusInfo> getFlightStatus(String depDate);
}
