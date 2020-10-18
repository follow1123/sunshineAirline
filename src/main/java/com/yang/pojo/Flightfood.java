package com.yang.pojo;
public class Flightfood implements java.io.Serializable{
	private int foodId;
	private String name;
	private String description;
	private double price;
	private String img;
	public Flightfood(){}
	public int getFoodId(){
		return this.foodId;
	}
	public void setFoodId(int value){
		this.foodId = value;
	}
	public String getName(){
		return this.name;
	}
	public void setName(String value){
		this.name = value;
	}
	public String getDescription(){
		return this.description;
	}
	public void setDescription(String value){
		this.description = value;
	}
	public double getPrice(){
		return this.price;
	}
	public void setPrice(double value){
		this.price = value;
	}
	public String getImg(){
		return this.img;
	}
	public void setImg(String value){
		this.img = value;
	}
	@Override
	public String toString() {
		return "Flightfood{foodId='"+foodId+"'"+
		", name='"+name+"'"+
		", description='"+description+"'"+
		", price='"+price+"'"+
		", img='"+img+"'"+
		"}";
	}
}