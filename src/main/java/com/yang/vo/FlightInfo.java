package com.yang.vo;

import java.io.Serializable;

/**
 * @auther YF
 * @create 2020-10-08-16:50
 */
public class FlightInfo implements Serializable {
    private int reservationId;
    private String flightNumber;
    private String from;
    private String to;
    private String date;
    private String cabinType;

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCabinType() {
        return cabinType;
    }

    public void setCabinType(String cabinType) {
        this.cabinType = cabinType;
    }

    public FlightInfo(int reservationId, String flightNumber, String from, String to, String date, String cabinType) {
        this.reservationId = reservationId;
        this.flightNumber = flightNumber;
        this.from = from;
        this.to = to;
        this.date = date;
        this.cabinType = cabinType;
    }

    @Override
    public String toString() {
        return "FlightInfo{" +
                "reservationId=" + reservationId +
                ", flightNumber='" + flightNumber + '\'' +
                ", from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", date='" + date + '\'' +
                ", cabinType='" + cabinType + '\'' +
                '}';
    }
}
