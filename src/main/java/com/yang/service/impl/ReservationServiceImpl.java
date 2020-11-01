package com.yang.service.impl;

import com.yang.dao.ReservationMapper;
import com.yang.pojo.Flightfoodreservation;
import com.yang.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @auther YF
 * @create 2020-10-23-21:32
 */
@Service
public class ReservationServiceImpl implements ReservationService {
    private ReservationMapper reservationMapper;
    @Autowired
    public ReservationServiceImpl(ReservationMapper reservationMapper) {
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
