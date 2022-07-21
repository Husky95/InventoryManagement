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

public class WarehouseMySQLDAOImpl implements WarehouseDAO {

	@Override
	public List<Warehouse> getAllWarehouse() {
		String sql = "SELECT * FROM warehouse";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();
		try {
			Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());
			Warehouse warehouse = null;

			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(sql);
			LinkedList<Warehouse> warehouseList = new LinkedList<>();
			while(rs.next()) {
			
				warehouse = new Warehouse();
				warehouse.setWarehouseID(rs.getInt(1));
				warehouse.setWarehouseName(rs.getString(2));
				warehouse.setAddress(rs.getString(3));
				warehouse.setCity(rs.getString(4));
				warehouse.setState(rs.getString(5));
				warehouse.setZipcode(rs.getLong(6));
				warehouse.setCapacity(rs.getLong(7));

				warehouseList.add(warehouse);
			}
			rs.close();
			conn.close();
			return warehouseList;
			
		}catch(SQLException e){	e.printStackTrace();}

		return null;
	}

	
	@Override
	public Warehouse save(Warehouse warehouse) {
		// If this was auto-increment, then the artistid is not needed
		String sql = "INSERT INTO warehouse (warehouseName, address, city, state, zipcode, capacity) VALUES (?, ?, ?, ?, ?)";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();	

		try {
			Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());

			// Start a transaction
			conn.setAutoCommit(false); // Prevents each query from immediately altering the database
			
			// Obtain auto incremented values like so
			PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			ps.setString(1, warehouse.getWarehouseName());
			ps.setString(2, warehouse.getAddress());
			ps.setString(3, warehouse.getCity());
			ps.setString(4, warehouse.getState());
			ps.setLong(5, warehouse.getZipcode());
			ps.setLong(6, warehouse.getCapacity());

			
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
				return warehouse;
			} else {
				conn.rollback(); // Undoes any of the queries. Database pretends those never happened
			}
			
		} catch (SQLException e) {e.printStackTrace();}
		
		return null;
	}
	
	@Override
	public Warehouse updateWarehouse(Warehouse warehouse) {
		String sql = "UPDATE warehouse SET warehouseName=? , address=?, city=?, state=?, zipcode=?, capacity=? WHERE warehouseID=?";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();	
	        try{  
				Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());
				// Start a transaction
				conn.setAutoCommit(false); // Prevents each query from immediately altering the database
	            PreparedStatement ps = conn.prepareStatement(sql);  
	            ps.setString(1,warehouse.getWarehouseName());  
	            ps.setString(2,warehouse.getAddress());  
	            ps.setString(3,warehouse.getCity());  
	            ps.setString(4,warehouse.getState());  
	            ps.setLong(5,warehouse.getZipcode());
	            ps.setLong(6,warehouse.getCapacity());
	            ps.setInt(7,warehouse.getWarehouseID());  
				int rowsAffected = ps.executeUpdate(); // If 0 is returned, my data didn't save
				if( rowsAffected == 0) {
					System.out.println("UPDATE Item Query fail");
				}
				conn.commit();
	            conn.close();  
	        }catch(SQLException ex){ex.printStackTrace();}  
	      	return warehouse;
	}

	@Override
	public int deleteWarehouse(int warehouseID) {
		String sql = "DELETE FROM warehouse WHERE warehouseID=?";
		InventoryDbCreds creds = InventoryDbCreds.getInstance();	
		int status = 0;
		try{  
			Connection conn = DriverManager.getConnection(creds.getUrl(),creds.getUsername(),creds.getPassword());

			// Start a transaction
			conn.setAutoCommit(false); // Prevents each query from immediately altering the database
            PreparedStatement ps = conn.prepareStatement(sql);  
            ps.setInt(1,warehouseID);  
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
