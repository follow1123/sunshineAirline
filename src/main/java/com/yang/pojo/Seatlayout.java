package com.yang.pojo;
public class Seatlayout implements java.io.Serializable{
	private int id;
	private int rowNumber;
	private String columnName;
	private int cabinTypeId;
	private int aircraftId;
	public Seatlayout(){}
	public int getId(){
		return this.id;
	}
	public void setId(int value){
		this.id = value;
	}
	public int getRowNumber(){
		return this.rowNumber;
	}
	public void setRowNumber(int value){
		this.rowNumber = value;
	}
	public String getColumnName(){
		return this.columnName;
	}
	public void setColumnName(String value){
		this.columnName = value;
	}
	public int getCabinTypeId(){
		return this.cabinTypeId;
	}
	public void setCabinTypeId(int value){
		this.cabinTypeId = value;
	}
	public int getAircraftId(){
		return this.aircraftId;
	}
	public void setAircraftId(int value){
		this.aircraftId = value;
	}
	@Override
	public String toString() {
		return "Seatlayout{id='"+id+"'"+
		", rowNumber='"+rowNumber+"'"+
		", columnName='"+columnName+"'"+
		", cabinTypeId='"+cabinTypeId+"'"+
		", aircraftId='"+aircraftId+"'"+
		"}";
	}
}