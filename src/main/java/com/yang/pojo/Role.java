package com.yang.pojo;
public class Role implements java.io.Serializable{
	private int roldId;
	private String roleName;
	public Role(){}
	public int getRoldId(){
		return this.roldId;
	}
	public void setRoldId(int value){
		this.roldId = value;
	}
	public String getRoleName(){
		return this.roleName;
	}
	public void setRoleName(String value){
		this.roleName = value;
	}
	@Override
	public String toString() {
		return "Role{roldId='"+roldId+"'"+
		", roleName='"+roleName+"'"+
		"}";
	}
}