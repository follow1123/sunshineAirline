package com.yang.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * @auther YF
 * @create 2020-11-01-14:02
 */
public interface ScheduleMapper {

    int setStatus(@Param("scheduleId")  Integer scheduleId,
                  @Param("status") String status);

    Map<String, Object> getScheduleInfoById(@Param("id") Integer id);

}
