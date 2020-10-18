package com.yang.pojo;
public class Aircraft implements java.io.Serializable{
	private int aircraftId;
	private String name;
	private String firstSeatsLayout;
	private int firstSeatsAmount;
	private String businessSeatsLayout;
	private int businessSeatsAmount;
	private String economySeatsLayout;
	private int economySeatsAmount;
	public Aircraft(){}
	public int getAircraftId(){
		return this.aircraftId;
	}
	public void setAircraftId(int value){
		this.aircraftId = value;
	}
	public String getName(){
		return this.name;
	}
	public void setName(String value){
		this.name = value;
	}
	public String getFirstSeatsLayout(){
		return this.firstSeatsLayout;
	}
	public void setFirstSeatsLayout(String value){
		this.firstSeatsLayout = value;
	}
	public int getFirstSeatsAmount(){
		return this.firstSeatsAmount;
	}
	public void setFirstSeatsAmount(int value){
		this.firstSeatsAmount = value;
	}
	public String getBusinessSeatsLayout(){
		return this.businessSeatsLayout;
	}
	public void setBusinessSeatsLayout(String value){
		this.businessSeatsLayout = value;
	}
	public int getBusinessSeatsAmount(){
		return this.businessSeatsAmount;
	}
	public void setBusinessSeatsAmount(int value){
		this.businessSeatsAmount = value;
	}
	public String getEconomySeatsLayout(){
		return this.economySeatsLayout;
	}
	public void setEconomySeatsLayout(String value){
		this.economySeatsLayout = value;
	}
	public int getEconomySeatsAmount(){
		return this.economySeatsAmount;
	}
	public void setEconomySeatsAmount(int value){
		this.economySeatsAmount = value;
	}
	@Override
	public String toString() {
		return "Aircraft{aircraftId='"+aircraftId+"'"+
		", name='"+name+"'"+
		", firstSeatsLayout='"+firstSeatsLayout+"'"+
		", firstSeatsAmount='"+firstSeatsAmount+"'"+
		", businessSeatsLayout='"+businessSeatsLayout+"'"+
		", businessSeatsAmount='"+businessSeatsAmount+"'"+
		", economySeatsLayout='"+economySeatsLayout+"'"+
		", economySeatsAmount='"+economySeatsAmount+"'"+
		"}";
	}
}