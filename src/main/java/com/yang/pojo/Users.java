package com.yang.pojo;
public class Users implements java.io.Serializable{
	private int userId;
	private String email;
	private String firstName;
	private String lastName;
	private String password;
	private String gender;
	private String dateOfBirth;
	private String phone;
	private byte[] photo;
	private String address;
	private int roleId;
	public Users(){}
	public int getUserId(){
		return this.userId;
	}
	public void setUserId(int value){
		this.userId = value;
	}
	public String getEmail(){
		return this.email;
	}
	public void setEmail(String value){
		this.email = value;
	}
	public String getFirstName(){
		return this.firstName;
	}
	public void setFirstName(String value){
		this.firstName = value;
	}
	public String getLastName(){
		return this.lastName;
	}
	public void setLastName(String value){
		this.lastName = value;
	}
	public String getPassword(){
		return this.password;
	}
	public void setPassword(String value){
		this.password = value;
	}
	public String getGender(){
		return this.gender;
	}
	public void setGender(String value){
		this.gender = value;
	}
	public String getDateOfBirth(){
		return this.dateOfBirth;
	}
	public void setDateOfBirth(String value){
		this.dateOfBirth = value;
	}
	public String getPhone(){
		return this.phone;
	}
	public void setPhone(String value){
		this.phone = value;
	}
	public byte[] getPhoto(){
		return this.photo;
	}
	public void setPhoto(byte[] value){
		this.photo = value;
	}
	public String getAddress(){
		return this.address;
	}
	public void setAddress(String value){
		this.address = value;
	}
	public int getRoleId(){
		return this.roleId;
	}
	public void setRoleId(int value){
		this.roleId = value;
	}
	@Override
	public String toString() {
		return "Users{userId='"+userId+"'"+
		", email='"+email+"'"+
		", firstName='"+firstName+"'"+
		", lastName='"+lastName+"'"+
		", password='"+password+"'"+
		", gender='"+gender+"'"+
		", dateOfBirth='"+dateOfBirth+"'"+
		", phone='"+phone+"'"+
		", photo='"+photo+"'"+
		", address='"+address+"'"+
		", roleId='"+roleId+"'"+
		"}";
	}
}