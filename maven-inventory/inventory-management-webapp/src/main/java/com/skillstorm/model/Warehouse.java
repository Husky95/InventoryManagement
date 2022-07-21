package com.skillstorm.model;

public class Warehouse {
	private	int warehouseID;
	private String warehouseName;
	private String address;
	private String city;
	private String state;
	private long zipcode;
	private long capacity;
	
	public int getWarehouseID() {
		return warehouseID;
	}
	public void setWarehouseID(int warehouseID) {
		this.warehouseID = warehouseID;
	}
	public String getWarehouseName() {
		return warehouseName;
	}
	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public long getZipcode() {
		return zipcode;
	}
	public void setZipcode(long zipcode) {
		this.zipcode = zipcode;
	}
	public long getCapacity() {
		return capacity;
	}
	public void setCapacity(long capacity) {
		this.capacity = capacity;
	}
	@Override
	public String toString() {
		return "Warehouse [warehouseID=" + warehouseID + ", warehouseName=" + warehouseName + ", address=" + address
				+ ", city=" + city + ", state=" + state + ", zipcode=" + zipcode + ", capacity=" + capacity + "]";
	}

}
