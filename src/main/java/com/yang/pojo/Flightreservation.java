package com.yang.pojo;
public class Flightreservation implements java.io.Serializable{
	private int reservationId;
	private String firstname;
	private String lastname;
	private String iDType;
	private String iDTypeNumber;
	private String countryCode;
	private String gender;
	private String phone;
	private String birthday;
	private String eTicketNumber;
	private double payment;
	private int cabinTypeId;
	private int userId;
	private int scheduleId;
	private int seatLayoutId;
	public Flightreservation(){}
	public int getReservationId(){
		return this.reservationId;
	}
	public void setReservationId(int value){
		this.reservationId = value;
	}
	public String getFirstname(){
		return this.firstname;
	}
	public void setFirstname(String value){
		this.firstname = value;
	}
	public String getLastname(){
		return this.lastname;
	}
	public void setLastname(String value){
		this.lastname = value;
	}
	public String getIDType(){
		return this.iDType;
	}
	public void setIDType(String value){
		this.iDType = value;
	}
	public String getIDTypeNumber(){
		return this.iDTypeNumber;
	}
	public void setIDTypeNumber(String value){
		this.iDTypeNumber = value;
	}
	public String getCountryCode(){
		return this.countryCode;
	}
	public void setCountryCode(String value){
		this.countryCode = value;
	}
	public String getGender(){
		return this.gender;
	}
	public void setGender(String value){
		this.gender = value;
	}
	public String getPhone(){
		return this.phone;
	}
	public void setPhone(String value){
		this.phone = value;
	}
	public String getBirthday(){
		return this.birthday;
	}
	public void setBirthday(String value){
		this.birthday = value;
	}
	public String getETicketNumber(){
		return this.eTicketNumber;
	}
	public void setETicketNumber(String value){
		this.eTicketNumber = value;
	}
	public double getPayment(){
		return this.payment;
	}
	public void setPayment(double value){
		this.payment = value;
	}
	public int getCabinTypeId(){
		return this.cabinTypeId;
	}
	public void setCabinTypeId(int value){
		this.cabinTypeId = value;
	}
	public int getUserId(){
		return this.userId;
	}
	public void setUserId(int value){
		this.userId = value;
	}
	public int getScheduleId(){
		return this.scheduleId;
	}
	public void setScheduleId(int value){
		this.scheduleId = value;
	}
	public int getSeatLayoutId(){
		return this.seatLayoutId;
	}
	public void setSeatLayoutId(int value){
		this.seatLayoutId = value;
	}
	@Override
	public String toString() {
		return "Flightreservation{reservationId='"+reservationId+"'"+
		", firstname='"+firstname+"'"+
		", lastname='"+lastname+"'"+
		", iDType='"+iDType+"'"+
		", iDTypeNumber='"+iDTypeNumber+"'"+
		", countryCode='"+countryCode+"'"+
		", gender='"+gender+"'"+
		", phone='"+phone+"'"+
		", birthday='"+birthday+"'"+
		", eTicketNumber='"+eTicketNumber+"'"+
		", payment='"+payment+"'"+
		", cabinTypeId='"+cabinTypeId+"'"+
		", userId='"+userId+"'"+
		", scheduleId='"+scheduleId+"'"+
		", seatLayoutId='"+seatLayoutId+"'"+
		"}";
	}
}