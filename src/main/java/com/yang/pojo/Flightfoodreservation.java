package com.yang.pojo;
public class Flightfoodreservation implements java.io.Serializable{
	private int reservationId;
	private int foodId;
	private int amount;
	public Flightfoodreservation(){}
	public int getReservationId(){
		return this.reservationId;
	}
	public void setReservationId(int value){
		this.reservationId = value;
	}
	public int getFoodId(){
		return this.foodId;
	}
	public void setFoodId(int value){
		this.foodId = value;
	}
	public int getAmount(){
		return this.amount;
	}
	public void setAmount(int value){
		this.amount = value;
	}
	@Override
	public String toString() {
		return "Flightfoodreservation{reservationId='"+reservationId+"'"+
		", foodId='"+foodId+"'"+
		", amount='"+amount+"'"+
		"}";
	}
}