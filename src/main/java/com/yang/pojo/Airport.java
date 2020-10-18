package com.yang.pojo;
public class Airport implements java.io.Serializable{
	private String iATACode;
	private String airportName;
	private String cityCode;
	public Airport(){}
	public String getIATACode(){
		return this.iATACode;
	}
	public void setIATACode(String value){
		this.iATACode = value;
	}
	public String getAirportName(){
		return this.airportName;
	}
	public void setAirportName(String value){
		this.airportName = value;
	}
	public String getCityCode(){
		return this.cityCode;
	}
	public void setCityCode(String value){
		this.cityCode = value;
	}
	@Override
	public String toString() {
		return "Airport{iATACode='"+iATACode+"'"+
		", airportName='"+airportName+"'"+
		", cityCode='"+cityCode+"'"+
		"}";
	}
}