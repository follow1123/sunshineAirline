package com.yang.pojo;
public class Luggage implements java.io.Serializable{
	private int reservationId;
	private int amount;
	private double weight;
	private double fee;
	public Luggage(){}
	public int getReservationId(){
		return this.reservationId;
	}
	public void setReservationId(int value){
		this.reservationId = value;
	}
	public int getAmount(){
		return this.amount;
	}
	public void setAmount(int value){
		this.amount = value;
	}
	public double getWeight(){
		return this.weight;
	}
	public void setWeight(double value){
		this.weight = value;
	}
	public double getFee(){
		return this.fee;
	}
	public void setFee(double value){
		this.fee = value;
	}
	@Override
	public String toString() {
		return "Luggage{reservationId='"+reservationId+"'"+
		", amount='"+amount+"'"+
		", weight='"+weight+"'"+
		", fee='"+fee+"'"+
		"}";
	}
}