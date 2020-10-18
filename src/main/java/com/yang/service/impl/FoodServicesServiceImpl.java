package com.yang.service.impl;

import com.yang.dao.FoodMapper;
import com.yang.dao.UnionMapper;
import com.yang.service.FoodServicesService;
import com.yang.vo.FlightInfo;
import com.yang.pojo.Flightfood;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-08-17:08
 */
public class FoodServicesServiceImpl implements FoodServicesService {

    private UnionMapper unionMapper;

    private FoodMapper foodMapper;

    public void setFoodMapper(FoodMapper foodMapper) {
        this.foodMapper = foodMapper;
    }

    public void setUnionMapper(UnionMapper unionMapper) {
        this.unionMapper = unionMapper;
    }

    @Override
    public List<FlightInfo> getFlightInfo(String idType, String idTypeNumber) {
        return unionMapper.getFlightInfo(idType, idTypeNumber);
    }

    @Override
    public List<Flightfood> getFood(Integer id) {
        return foodMapper.getFood(id);
    }
}
