import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, SelectItemGroup } from 'primeng/api';
import { ApiService } from '../services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import { VariablesService } from '../variables.service'
interface City {
  name: string;
  code: string;
}

interface Warehouse {
  name: string;
  code: number;
}

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent implements OnInit {

  cities: City[];
  warehouseData : any;
  warehouseName :  Array<any>;
  warehouse: Warehouse[];
  warehouseTemp: Warehouse[];

  selectedWarehouse: Warehouse[];
  dataSource: MatTableDataSource<any>;

  constructor(private primengConfig: PrimeNGConfig, private api : ApiService, private warehouseGlobal : VariablesService) {
    this.cities = [{ name: 'Warehouse List', code: 'NY' }];
    dataSource : MatTableDataSource<any>;

    this.warehouse = [
      { name: 'Australia', code : 0 },
      { name: 'Brazil' , code : 0 },
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
    ];

    this.warehouseTemp = [
      { name: '', code : 0 },
      { name: '' , code : 0 },
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},
      { name:  '' , code : 0},

    ];
  }

  ngOnInit() {
    this.getAllWarehouse();
    this.primengConfig.ripple = true;
   
  } 
  onSave(){
    console.log(this.selectedWarehouse)
    let temp = this.selectedWarehouse
    let temp1 = JSON.stringify(temp);
    let temp2 = JSON.parse(temp1)
    console.log(temp2.code);
    this.warehouseGlobal.warehouseObject = this.warehouseData[temp2.code-1];
    console.log(this.warehouseGlobal.warehouseObject);
  }
  getAllWarehouse(){
    this.api.getWarehouse()
    .subscribe({
      next:(res)=>{
        console.log(res.length);
      
        this.warehouseData = res;
        let tempName = [];
        let tempNumber = [];
        for(let i = 0 ; i < res.length; i++){
          //console.log(this.warehouseData[0].warehouseName)
          tempName[i] = this.warehouseData[i].warehouseName;
          tempNumber[i] = this.warehouseData[i].warehouseID;

        }
        for(let i = 0 ; i < res.length; i++){
          //console.log(this.warehouseData[0].warehouseName)
          this.warehouseTemp[i].name = tempName[i];
          this.warehouseTemp[i].code = tempNumber[i];

        }
        this.warehouse = this.warehouseTemp;

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
