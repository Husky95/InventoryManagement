import { Component, OnInit, OnChanges  } from '@angular/core';
import { VariablesService } from '../variables.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  datadoughnut: any;
  warehouseName = 'None'
  warehouseStreet = 'None'
  warehouseCity = 'None'
  warehouseState = 'None'
  warehouseZipcode = 'None'
  warehouseCapacity = 'None'
  id : any;
  constructor(private warehouseGlobal : VariablesService ) {  }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.setWarehouse(); 
    }, 10);   

    this.datadoughnut = {
      labels: ['Full','Empty'],
      datasets: [
          {
              data: [ 30, 70],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
              ]
          }]    
      };

  }
  ngOnChanges(warehouseGlobal: VariablesService){
    console.log("chagne")
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  setWarehouse(){
    this.warehouseName = this.warehouseGlobal.warehouseObject.warehouseName;
    this.warehouseStreet = this.warehouseGlobal.warehouseObject.address;
    this.warehouseCity = this.warehouseGlobal.warehouseObject.city;
    this.warehouseState = this.warehouseGlobal.warehouseObject.state;
    this.warehouseZipcode = this.warehouseGlobal.warehouseObject.zipcode;
    this.warehouseCapacity = this.warehouseGlobal.warehouseObject.capacity;

  }
}
