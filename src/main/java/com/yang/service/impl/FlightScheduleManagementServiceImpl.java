package com.yang.service.impl;

import com.yang.dao.CityMapper;
import com.yang.dao.UnionMapper;
import com.yang.service.FlightScheduleManagementService;
import com.yang.vo.FlightScheduleInfo;

import java.util.List;
import java.util.Map;

/**
 * @auther YF
 * @create 2020-10-31-16:58
 */
public class FlightScheduleManagementServiceImpl implements FlightScheduleManagementService {

    private CityMapper cityMapper;

    private UnionMapper unionMapper;

    public void setUnionMapper(UnionMapper unionMapper) {
        this.unionMapper = unionMapper;
    }

    public void setCityMapper(CityMapper cityMapper) {
        this.cityMapper = cityMapper;
    }

    @Override
    public List<String> getIATACode() {
        return cityMapper.getIATACode();
    }

    @Override
    public List<String> getCityNames() {
        return cityMapper.getCityNames();
    }

    @Override
    public List<FlightScheduleInfo> getFlightSchedule(Map<String, Object> map) {
        return unionMapper.getFlightSchedule(map);
    }
}
