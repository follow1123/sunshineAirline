package com.yang.service.impl;

import com.yang.dao.UnionMapper;
import com.yang.service.FlightStatusService;
import com.yang.vo.FlightStatusInfo;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-29-22:30
 */
public class FlightStatusServiceImpl implements FlightStatusService {


    private UnionMapper unionMapper;

    public void setUnionMapper(UnionMapper unionMapper) {
        this.unionMapper = unionMapper;
    }

    @Override
    public List<FlightStatusInfo> getFlightStatus(String depDate) {
        return unionMapper.getFlightStatus(depDate);
    }
}
