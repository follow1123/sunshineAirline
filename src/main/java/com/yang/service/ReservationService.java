package com.yang.service;

import com.yang.pojo.Flightfoodreservation;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-23-21:31
 */
public interface ReservationService {
    List<Flightfoodreservation> getFoodReservationOrder(@Param("reservationId") Integer reservationId);

    int setFoodReservation(Flightfoodreservation flightFoodReservation);

    int deleteFoodReservation(@Param("reservationId") Integer reservationId);
}
