package com.yang.pojo;
public class Route implements java.io.Serializable{
	private int routeId;
	private String departureAirportIATA;
	private String arrivalAirportIATA;
	private int distance;
	private int flightTime;
	public Route(){}
	public int getRouteId(){
		return this.routeId;
	}
	public void setRouteId(int value){
		this.routeId = value;
	}
	public String getDepartureAirportIATA(){
		return this.departureAirportIATA;
	}
	public void setDepartureAirportIATA(String value){
		this.departureAirportIATA = value;
	}
	public String getArrivalAirportIATA(){
		return this.arrivalAirportIATA;
	}
	public void setArrivalAirportIATA(String value){
		this.arrivalAirportIATA = value;
	}
	public int getDistance(){
		return this.distance;
	}
	public void setDistance(int value){
		this.distance = value;
	}
	public int getFlightTime(){
		return this.flightTime;
	}
	public void setFlightTime(int value){
		this.flightTime = value;
	}
	@Override
	public String toString() {
		return "Route{routeId='"+routeId+"'"+
		", departureAirportIATA='"+departureAirportIATA+"'"+
		", arrivalAirportIATA='"+arrivalAirportIATA+"'"+
		", distance='"+distance+"'"+
		", flightTime='"+flightTime+"'"+
		"}";
	}
}