package com.yang.pojo;
public class Flightstatus implements java.io.Serializable{
	private int scheduleId;
	private java.util.Date actualArrivalTime;
	public Flightstatus(){}
	public int getScheduleId(){
		return this.scheduleId;
	}
	public void setScheduleId(int value){
		this.scheduleId = value;
	}
	public java.util.Date getActualArrivalTime(){
		return this.actualArrivalTime;
	}
	public void setActualArrivalTime(java.util.Date value){
		this.actualArrivalTime = value;
	}
	@Override
	public String toString() {
		return "Flightstatus{scheduleId='"+scheduleId+"'"+
		", actualArrivalTime='"+actualArrivalTime+"'"+
		"}";
	}
}