import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  constructor(private http : HttpClient ) {}
  postItem(data:any){
    return this.http.post<any>("http://localhost:8080/inventory-management-webapp/items/",data)
  }
  getItem(){
    return this.http.get<any>("http://localhost:8080/inventory-management-webapp/items/")
    //return this.http.get<any>("http://localhost:3000/productList")
  }
  putItem(data:any){
    return this.http.put<any>("http://localhost:8080/inventory-management-webapp/items/",data)
  }
  deleteItem(id:any){
    return this.http.delete<any>("http://localhost:8080/inventory-management-webapp/items/"+id);
  }
  getWarehouse(){
    return this.http.get<any>("http://localhost:8080/inventory-management-webapp/warehouse/")
  }
  postWarehouse(data:any){
    return this.http.post<any>("http://localhost:8080/inventory-management-webapp/warehouse/",data)
  }
  putWarehouse(data:any){
    return this.http.put<any>("http://localhost:8080/inventory-management-webapp/warehouse/",data)
  }
  deleteWarehouse(id:any){
    return this.http.delete<any>("http://localhost:8080/inventory-management-webapp/warehouse/"+id)
  }
}
