package com.yang.pojo;
public class Cabintype implements java.io.Serializable{
	private int cabinTypeId;
	private String cabinTypeName;
	public Cabintype(){}
	public int getCabinTypeId(){
		return this.cabinTypeId;
	}
	public void setCabinTypeId(int value){
		this.cabinTypeId = value;
	}
	public String getCabinTypeName(){
		return this.cabinTypeName;
	}
	public void setCabinTypeName(String value){
		this.cabinTypeName = value;
	}
	@Override
	public String toString() {
		return "Cabintype{cabinTypeId='"+cabinTypeId+"'"+
		", cabinTypeName='"+cabinTypeName+"'"+
		"}";
	}
}