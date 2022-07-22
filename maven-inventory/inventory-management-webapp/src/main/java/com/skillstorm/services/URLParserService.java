package com.skillstorm.services;
/**
* Return a integer from the url. 
* Method take in a url value and extracted the value after /  
* @param  url  an absolute URL giving the base location of the image
* @return      value after / 
*/
public class URLParserService {
	public int extractIdFromURL(String url) {
//		System.out.println(url); // /12/123
		String[] splitString = url.split("/"); // [12, 123]
		
		return Integer.parseInt(splitString[1]); // Throws an exception if this isn't a int
	}
}