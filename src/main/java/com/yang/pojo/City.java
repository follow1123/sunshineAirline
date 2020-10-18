package com.yang.pojo;
public class City implements java.io.Serializable{
	private String cityCode;
	private String cityName;
	private String countryCode;
	public City(){}
	public String getCityCode(){
		return this.cityCode;
	}
	public void setCityCode(String value){
		this.cityCode = value;
	}
	public String getCityName(){
		return this.cityName;
	}
	public void setCityName(String value){
		this.cityName = value;
	}
	public String getCountryCode(){
		return this.countryCode;
	}
	public void setCountryCode(String value){
		this.countryCode = value;
	}
	@Override
	public String toString() {
		return "City{cityCode='"+cityCode+"'"+
		", cityName='"+cityName+"'"+
		", countryCode='"+countryCode+"'"+
		"}";
	}
}