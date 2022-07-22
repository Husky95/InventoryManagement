package com.skillstorm.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillstorm.daos.ItemDAO;
import com.skillstorm.daos.ItemMySQLDAOImpl;
import com.skillstorm.model.Item;
import com.skillstorm.model.NotFound;
import com.skillstorm.services.URLParserService;

@WebServlet(urlPatterns = "/items/*")
public class ItemServlet extends HttpServlet {


	/**
	 * 
	 */
	private static final long serialVersionUID = 180781512143496763L;

	/*
	 * Servlet Lifecycle
	 * 
	 * init - A method called when the web server first creates our servlet
	 * service - method called before EVERY request
	 * destroy - method called when the web server is stopped/servlet terminates
	 */
	
	@Override
	public void init() throws ServletException {
		// This allows us to write code that is run right as the servlet is created
		// You can establish any connections
		
		//System.out.println("ArtistServlet Created!");
		super.init();
	}

	@Override
	public void destroy() {
		// If any connections were established in init
		// Terminate those connections here
		//System.out.println("ArtistServlet Destroyed!");
		super.destroy();
	}
	
	// I would prefer filters to this
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// This method activates on ALL HTTP requests to this servlet
		System.out.println("Servicing request!");
		super.service(req, resp); // Keep this line
	}
	
	ItemDAO dao = new ItemMySQLDAOImpl();
	ObjectMapper mapper = new ObjectMapper();
	URLParserService urlService = new URLParserService();
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		try {
			//int id = urlService.extractIdFromURL(req.getPathInfo());
			List<Item> artists = dao.getAllItems();
			System.out.println(artists);
			resp.setContentType("application/json");
			resp.getWriter().print(mapper.writeValueAsString(artists));
			
		} catch (Exception e) {
			// Means that there wasn't an id in the URL. Fetch all artists instead
			resp.setStatus(404);
			resp.getWriter().print(mapper.writeValueAsString(new NotFound("No artist with the provided Id found")));
		}
		
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Do Post");

		InputStream reqBody = req.getInputStream();

		Item newItem = mapper.readValue(reqBody, Item.class);
		System.out.println(newItem);

		newItem = dao.save(newItem); // IF the id changed
		System.out.println(newItem);

		if (newItem != null) {
			resp.setContentType("application/json");
			resp.getWriter().print(mapper.writeValueAsString(newItem));
			resp.setStatus(201); // The default is 200
		} else {
			resp.setStatus(400);
			resp.getWriter().print(mapper.writeValueAsString(new NotFound("Unable to create item")));
		}
	}
	
	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Do Put");
		InputStream reqBody = req.getInputStream();
		Item newItem = mapper.readValue(reqBody, Item.class);
		newItem = dao.updateItem(newItem); 
		if (newItem != null) {
			resp.setContentType("application/json");
			resp.getWriter().print(mapper.writeValueAsString(newItem));
			resp.setStatus(201); // The default is 200
		} else {
			resp.setStatus(400);
			resp.getWriter().print(mapper.writeValueAsString(new NotFound("Unable to update item")));
		}
	}
	
	@Override
	protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("Do Delete");
		int id = urlService.extractIdFromURL(req.getPathInfo());
		int status = dao.deleteItem(id); 
		if (status != 0) {
			resp.setStatus(201); // The default is 200
		} else {
			resp.setStatus(400);
			resp.getWriter().print(mapper.writeValueAsString(new NotFound("Unable to Delete item")));
		}
	}

}