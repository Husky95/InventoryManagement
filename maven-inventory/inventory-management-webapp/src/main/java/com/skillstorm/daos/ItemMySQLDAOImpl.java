package com.skillstorm.daos;
import java.util.*;

import com.skillstorm.conf.InventoryDbCreds;
import com.skillstorm.model.*;
//java.sql package
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ItemMySQLDAOImpl implements ItemDAO {

	@Override
	public List<Item> getAllItems() {
		String sql = "select * from inventory";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();
		try {
			Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());
			Item item = null;

			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			LinkedList<Item> itemList = new LinkedList<>();
			while(rs.next()) {
				//Item items = new Item(rs.getInt("itemID"),rs.getString("itemName"));
				//itemList.add(items);
				item = new Item();
				item.setItemID(rs.getInt(1));
				item.setItemName(rs.getString(2));
				item.setItemCompany(rs.getString(3));
				item.setItemCategory(rs.getString(4));
				item.setItemPrice(rs.getLong(5));
				
				itemList.add(item);
			}
			rs.close();
			conn.close();
			return itemList;
			
		}catch(SQLException e)
		{
			e.printStackTrace();
		}

		return null;
	}

	@Override
	public Item findByID(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Item findByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addNewItem(Item newItem) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateItem(Item item) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Item item) {
		// TODO Auto-generated method stub
		
	}
}
