package com.skillstorm.daos;
import java.util.List;
import com.skillstorm.model.*;

public interface ItemDAO {
	
	//public Item getItemDetails(int id);
	public List<Item> getAllItems();
	public Item findByID(int id);
	public Item findByName(String name);
	public void addNewItem(Item newItem);
	public void updateItem(Item item);
	public void delete(Item item);

	
}


