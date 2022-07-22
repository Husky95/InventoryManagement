import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/**
 * Service to set globalvariable 
 */
export class VariablesService {
/**
 * store the current selected warehouseobject 
 * @type {any}
 */
  warehouseObject : any ;
/**
 * store the warehouse current capacity 
 * @type {number}
 */
  currentCapacity : number;

  constructor() { }
}
