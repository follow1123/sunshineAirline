package com.yang.pojo;
public class Country implements java.io.Serializable{
	private String countryCode;
	private String countryName;
	public Country(){}
	public String getCountryCode(){
		return this.countryCode;
	}
	public void setCountryCode(String value){
		this.countryCode = value;
	}
	public String getCountryName(){
		return this.countryName;
	}
	public void setCountryName(String value){
		this.countryName = value;
	}
	@Override
	public String toString() {
		return "Country{countryCode='"+countryCode+"'"+
		", countryName='"+countryName+"'"+
		"}";
	}
}