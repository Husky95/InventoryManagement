import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  warehouseObject : any ;
  currentCapacity : number;

  constructor() { }
}
