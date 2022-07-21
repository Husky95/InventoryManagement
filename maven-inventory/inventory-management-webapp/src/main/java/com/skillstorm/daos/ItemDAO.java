package com.skillstorm.daos;
import java.util.List;
import com.skillstorm.model.*;

public interface ItemDAO {
	
	//public Item getItemDetails(int id);
	public List<Item> getAllItems();
	public Item findByID(int id);
	public Item findByName(String name);
	public Item save(Item item);
	public Item updateItem(Item item);	
	public int deleteItem(int itemID);

	
}


