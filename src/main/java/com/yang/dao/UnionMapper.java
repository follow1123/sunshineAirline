package com.yang.dao;

import com.yang.vo.FlightInfo;
import com.yang.vo.Ticket;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @auther YF
 * @create 2020-08-30-21:00
 */
public interface UnionMapper {
    List<Ticket> getTickets(@Param("from") String depCity,
                            @Param("to") String arrCity,
                            @Param("date") String date);

    List<Integer> getBookedSeats(@Param("date") String date,
                                         @Param("scheduleId") int scheduleId);
    List<FlightInfo> getFlightInfo(@Param("idType") String idType,
                                   @Param("idTypeNumber") String idTypeNumber);
}
