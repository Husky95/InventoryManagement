package com.skillstorm.daos;
import java.util.*;

import com.skillstorm.conf.InventoryDbCreds;
import com.skillstorm.model.*;
//java.sql package
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ItemMySQLDAOImpl implements ItemDAO {

	@Override
	public List<Item> getAllItems() {
		String sql = "SELECT * FROM inventory";
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
			
		}catch(SQLException e){	e.printStackTrace();}

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
	public Item save(Item item) {
		// If this was auto-increment, then the artistid is not needed
		String sql = "INSERT INTO inventory (itemName, itemCategory) VALUES (?, ?)";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();	

		try {
			Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());

			// Start a transaction
			conn.setAutoCommit(false); // Prevents each query from immediately altering the database
			
			// Obtain auto incremented values like so
			PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, item.getItemCategory());
			ps.setString(2, item.getItemName());
			
			int rowsAffected = ps.executeUpdate(); // If 0 is returned, my data didn't save
			if (rowsAffected != 0) {
				// If I want my keys do this code
				ResultSet keys = ps.getGeneratedKeys();
				// List a of all generated keys
//				if (keys.next()) {
//					int key = keys.getInt(1); // Give me the auto generated key
//					artist.setId(key);
//					return artist;
//				}
				conn.commit(); // Executes ALL queries in a given transaction. Green button
				conn.close();
				return item;
			} else {
				conn.rollback(); // Undoes any of the queries. Database pretends those never happened
			}
			
		} catch (SQLException e) {e.printStackTrace();}
		
		return null;
	}


	@Override
	public Item updateItem(Item item) {
		String sql = "UPDATE inventory SET itemName=? , itemCategory=? WHERE itemID=?";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();	
	        try{  
				Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());
				// Start a transaction
				conn.setAutoCommit(false); // Prevents each query from immediately altering the database
	            PreparedStatement ps = conn.prepareStatement(sql);  
	            ps.setString(1,item.getItemName());  
	            ps.setString(2,item.getItemCategory());  
	            ps.setInt(3,item.getItemID());  
				int rowsAffected = ps.executeUpdate(); // If 0 is returned, my data didn't save
				if( rowsAffected == 0) {
					System.out.println("UPDATE Item Query fail");
				}
				conn.commit();
	            conn.close();  
	        }catch(SQLException ex){ex.printStackTrace();}  
	      	return item;
	}
	
	@Override
	public int deleteItem(int itemID) {
		String sql = "DELETE FROM inventory WHERE itemID=?";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();	
		int status = 0;
		try{  
			Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());

			// Start a transaction
			conn.setAutoCommit(false); // Prevents each query from immediately altering the database
            PreparedStatement ps = conn.prepareStatement(sql);  
            ps.setInt(1,itemID);  
			status = ps.executeUpdate(); // If 0 is returned, my data didn't save
			System.out.println(status);
			
			if( status == 0) {
				System.out.println("UPDATE Item Query fail");
			}
			conn.commit();
            conn.close();  
        }catch(SQLException ex){ex.printStackTrace();}
		return status;
	}
	
}
