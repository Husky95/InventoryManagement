package com.skillstorm;

import java.util.List;

import com.skillstorm.daos.ItemDAO;
import com.skillstorm.daos.ItemMySQLDAOImpl;
import com.skillstorm.model.*;
public class Driver {
	
	public static void main(String[] args)
	{
		ItemDAO dao = new ItemMySQLDAOImpl();
		List<Item> itemList = dao.getAllItems();
		System.out.println(itemList);
	}

}
