package com.skillstorm.conf;

public class InventoryDbCreds {
	private String url;
	private String username;
	private String password;
	
	private static InventoryDbCreds instance;
	private InventoryDbCreds() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");	
		}catch(ClassNotFoundException e) {
			e.printStackTrace();
		}
		this.url = "jdbc:mysql://localhost:3306/inventorydatabase";
		this.username = "root";
		this.password = "root";
	}
	public static InventoryDbCreds getInstance() {
		if (instance == null) {
			instance = new InventoryDbCreds();
		}
		return instance;
	}
	public String getUrl() {
		return url;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
}
