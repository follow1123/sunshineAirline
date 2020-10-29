package com.yang.vo;

/**
 * @auther YF
 * @create 2020-10-29-22:09
 */
public class FlightStatusInfo {
    private String flightNumber;
    private String from;
    private String to;
    private String scheduleStart;
    private String scheduleArrival;
    private String actualArrival;
    private String gate;
    private long status;

    public FlightStatusInfo(String flightNumber, String from, String to, String scheduleStart, String scheduleArrival, String actualArrival, String gate, long status) {
        this.flightNumber = flightNumber;
        this.from = from;
        this.to = to;
        this.scheduleStart = scheduleStart;
        this.scheduleArrival = scheduleArrival;
        this.actualArrival = actualArrival;
        this.gate = gate;
        this.status = status;
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

    public String getScheduleStart() {
        return scheduleStart;
    }

    public void setScheduleStart(String scheduleStart) {
        this.scheduleStart = scheduleStart;
    }

    public String getScheduleArrival() {
        return scheduleArrival;
    }

    public void setScheduleArrival(String scheduleArrival) {
        this.scheduleArrival = scheduleArrival;
    }

    public String getActualArrival() {
        return actualArrival;
    }

    public void setActualArrival(String actualArrival) {
        this.actualArrival = actualArrival;
    }

    public String getGate() {
        return gate;
    }

    public void setGate(String gate) {
        this.gate = gate;
    }

    public long getStatus() {
        return status;
    }

    public void setStatus(long status) {
        this.status = status;
    }
}

