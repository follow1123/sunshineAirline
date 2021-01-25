package com.yang.service.impl;

import com.yang.dao.CityMapper;
import com.yang.dao.ScheduleMapper;
import com.yang.dao.UnionMapper;
import com.yang.service.FlightScheduleManagementService;
import com.yang.vo.FlightScheduleInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @auther YF
 * @create 2020-10-31-16:58
 */
@Service
public class FlightScheduleManagementServiceImpl implements FlightScheduleManagementService {
    private CityMapper cityMapper;

    private UnionMapper unionMapper;

    private ScheduleMapper scheduleMapper;

    @Autowired
    public FlightScheduleManagementServiceImpl(CityMapper cityMapper, UnionMapper unionMapper, ScheduleMapper scheduleMapper) {
        this.cityMapper = cityMapper;
        this.unionMapper = unionMapper;
        this.scheduleMapper = scheduleMapper;
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

    @Override
    public int setStatus(Integer scheduleId, String status) {
        return scheduleMapper.setStatus(scheduleId, status);
    }

    @Override
    public List<Map<String, Object>> getSeats(Integer id, Boolean sold) {
        return unionMapper.getSeats(id, sold);
    }

    @Override
    public List<Map<String, Object>> getSeats(Integer id) {
        return unionMapper.getSeats(id, null);
    }

    @Override
    public Map<String, Object> getScheduleInfo(Integer id) {
        return scheduleMapper.getScheduleInfoById(id);
    }

}
