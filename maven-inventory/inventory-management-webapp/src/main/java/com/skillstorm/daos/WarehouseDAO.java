package com.skillstorm.daos;

import java.util.List;

import com.skillstorm.model.Warehouse;

public interface WarehouseDAO {
	public List<Warehouse> getAllWarehouse();
	public Warehouse save(Warehouse warehouse);
	public Warehouse updateWarehouse(Warehouse warehouse);	
	public int deleteWarehouse(int warehouseID);
}
