package com.skillstorm.model;

public class Item {
	private int itemID;
	private String itemName;
	private String itemCompany;
	private String itemCategory;
	private long itemPrice;
	private long itemQuantity;
	
	public Item() {}
	public Item(String itemName) {}
	public Item(int itemID, String itemName) {}
	// Getters and Setters
	public int getItemID() {
		return itemID;
	}
	public void setItemID(int itemID) {
		this.itemID = itemID;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public String getItemCompany() {
		return itemCompany;
	}
	public void setItemCompany(String itemCompany) {
		this.itemCompany = itemCompany;
	}
	public String getItemCategory() {
		return itemCategory;
	}
	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}
	public long getItemPrice() {
		return itemPrice;
	}
	public void setItemPrice(long itemPrice) {
		this.itemPrice = itemPrice;
	}
	public long getItemQuantity() {
		return itemQuantity;
	}
	public void setItemQuantity(long itemQuantity) {
		this.itemQuantity = itemQuantity;
	}
	@Override
	public String toString() {
		return "Item [itemID=" + itemID + ", itemName=" + itemName + ", itemCompany=" + itemCompany + ", itemCategory="
				+ itemCategory + ", itemPrice=" + itemPrice + "]";
	}
}
