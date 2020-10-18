package com.yang.vo;

/**
 * @auther YF
 * @create 2020-08-30-20:44
 */
public class Ticket {


    private String from;
    private String to;
    private int scheduleId;
    private String flightNumber;
    private String departureDate;
    private String arrivalDate;
    private double price;
    private int cabinTypeId;
    private int[] cabinType;
    private String depTime;

    public String getDepTime() {
        return depTime;
    }

    public void setDepTime(String depTime) {
        this.depTime = depTime;
    }

    private int flightTime;

    public int getFlightTime() {
        return flightTime;
    }

    public void setFlightTime(int flightTime) {
        this.flightTime = flightTime;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }


    public void setPrice(double price) {
        this.price = price;
    }

    public int[] getCabinType() {
        return cabinType;
    }

    public void setCabinType(int[] cabinType) {
        this.cabinType = cabinType;
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "from='" + from + '\'' +
                ", to='" + to + '\'' +
                ", flightNumber='" + flightNumber + '\'' +
                ", departureDate='" + departureDate + '\'' +
                ", arrivalDate='" + arrivalDate + '\'' +
                ", price=" + price +
                ", cabinTypeId=" + cabinTypeId +
                '}';
    }


    public Ticket(String from, String to, String flightNumber, String departureDate, double price, int cabinTypeId, int flightTime, String depTime, int scheduleId) {
        this.scheduleId = scheduleId;
        this.from = from;
        this.to = to;
        this.flightNumber = flightNumber;
        this.depTime = depTime;
        this.departureDate = departureDate;
        this.price = price;
        this.cabinTypeId = cabinTypeId;
        this.flightTime = flightTime;
    }

    public int getCabinTypeId() {
        return cabinTypeId;
    }

    public void setCabinTypeId(int cabinTypeId) {
        this.cabinTypeId = cabinTypeId;
    }

    public Ticket(String from) {
        this.from = from;
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

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(String departureDate) {
        this.departureDate = departureDate;
    }

    public String getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(String arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
