package com.yang.service;

import com.yang.vo.FlightInfo;
import com.yang.pojo.Flightfood;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-08-17:06
 */
public interface FoodServicesService {
    List<FlightInfo> getFlightInfo(String idType, String idTypeNumber);

    List<Flightfood> getFood(Integer id);
}
