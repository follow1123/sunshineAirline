package com.yang.service;

import com.yang.vo.Ticket;

import java.util.List;

/**
 * @auther YF
 * @create 2020-08-31-21:00
 */
public interface SearchFlightService {
    List<Ticket> search(String depCity, String arrCity, String date);

    List<String> getCityName();

    List<Integer> getBookedSeats(String date, int scheduleId);


}
