package com.yang.pojo;
public class Schedule implements java.io.Serializable{
	private int scheduleId;
	private String date;
	private String time;
	private int aircraftId;
	private int routeId;
	private double economyPrice;
	private String flightNumber;
	private String gate;
	private String status;
	public Schedule(){}
	public int getScheduleId(){
		return this.scheduleId;
	}
	public void setScheduleId(int value){
		this.scheduleId = value;
	}
	public String getDate(){
		return this.date;
	}
	public void setDate(String value){
		this.date = value;
	}
	public String getTime(){
		return this.time;
	}
	public void setTime(String value){
		this.time = value;
	}
	public int getAircraftId(){
		return this.aircraftId;
	}
	public void setAircraftId(int value){
		this.aircraftId = value;
	}
	public int getRouteId(){
		return this.routeId;
	}
	public void setRouteId(int value){
		this.routeId = value;
	}
	public double getEconomyPrice(){
		return this.economyPrice;
	}
	public void setEconomyPrice(double value){
		this.economyPrice = value;
	}
	public String getFlightNumber(){
		return this.flightNumber;
	}
	public void setFlightNumber(String value){
		this.flightNumber = value;
	}
	public String getGate(){
		return this.gate;
	}
	public void setGate(String value){
		this.gate = value;
	}
	public String getStatus(){
		return this.status;
	}
	public void setStatus(String value){
		this.status = value;
	}
	@Override
	public String toString() {
		return "Schedule{scheduleId='"+scheduleId+"'"+
		", date='"+date+"'"+
		", time='"+time+"'"+
		", aircraftId='"+aircraftId+"'"+
		", routeId='"+routeId+"'"+
		", economyPrice='"+economyPrice+"'"+
		", flightNumber='"+flightNumber+"'"+
		", gate='"+gate+"'"+
		", status='"+status+"'"+
		"}";
	}
}