package com.yang.service.impl;

import com.yang.dao.ReservationMapper;
import com.yang.pojo.Flightfoodreservation;
import com.yang.service.ReservationService;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-23-21:32
 */
public class ReservationServiceImpl implements ReservationService {

    private ReservationMapper reservationMapper;

    public void setReservationMapper(ReservationMapper reservationMapper) {
        this.reservationMapper = reservationMapper;
    }

    @Override
    public List<Flightfoodreservation> getFoodReservationOrder(Integer reservationId) {
        return reservationMapper.getFoodReservationOrder(reservationId);
    }

    @Override
    public int setFoodReservation(Flightfoodreservation flightFoodReservation) {
        return reservationMapper.setFoodReservation(flightFoodReservation);
    }

    @Override
    public int deleteFoodReservation(Integer reservationId) {
        return reservationMapper.deleteFoodReservation(reservationId);
    }
}
