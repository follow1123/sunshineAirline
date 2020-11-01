
package com.yang.vo;

/**
 * @auther YF
 * @create 2020-10-31-18:01
 */
public class FlightScheduleInfo {
    private String date;
    private String time;
    private String from;
    private String to;
    private String aircraft;
    private Double economyPrice;
    private String flightNumber;
    private String gate;
    private String status;
    private int scheduleId;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
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

    public String getAircraft() {
        return aircraft;
    }

    public void setAircraft(String aircraft) {
        this.aircraft = aircraft;
    }

    public Double getEconomyPrice() {
        return economyPrice;
    }

    public void setEconomyPrice(Double economyPrice) {
        this.economyPrice = economyPrice;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getGate() {
        return gate;
    }

    public void setGate(String gate) {
        this.gate = gate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    public FlightScheduleInfo(String date, String time, String from, String to, String aircraft, Double economyPrice, String flightNumber, String gate, String status, int scheduleId) {
        this.date = date;
        this.time = time;
        this.from = from;
        this.to = to;
        this.aircraft = aircraft;
        this.economyPrice = economyPrice;
        this.flightNumber = flightNumber;
        this.gate = gate;
        this.status = status;
        this.scheduleId = scheduleId;
    }
}