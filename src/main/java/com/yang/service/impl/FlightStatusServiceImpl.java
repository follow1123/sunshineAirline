package com.yang.service.impl;

import com.yang.dao.UnionMapper;
import com.yang.service.FlightStatusService;
import com.yang.vo.FlightStatusInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-29-22:30
 */
@Service
public class FlightStatusServiceImpl implements FlightStatusService {

    private UnionMapper unionMapper;

    @Autowired
    public FlightStatusServiceImpl(UnionMapper unionMapper) {
        this.unionMapper = unionMapper;
    }

    @Override
    public List<FlightStatusInfo> getFlightStatus(String depDate) {
        return unionMapper.getFlightStatus(depDate);
    }
}
