import { Component, OnInit, OnChanges, ViewChild  } from '@angular/core';
import { VariablesService } from '../variables.service'
import { UIChart } from 'primeng/chart';

@ViewChild('chart')
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  datadoughnut: any;
  renewData: any;

  warehouseName = 'None'
  warehouseStreet = 'None'
  warehouseCity = 'None'
  warehouseState = 'None'
  warehouseZipcode = 'None'
  warehouseCapacity = 'None'
  id : any;
  constructor(private warehouseGlobal : VariablesService ) {  }
/**
 * Init function that set the donut chart and call setInterval to call setWarehouse
 * 
 */
  ngOnInit(): void {
    
    this.id = setInterval(() => {
      this.setWarehouse(); 
    }, 100);   

    this.datadoughnut = {
      labels: ['Full','Empty'],
      datasets: [
          {
              data: [ 50, 50],
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
      this.renewData = {
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
/**
 * function to clear setInterval when component is destroy
 * 
 */
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
/**
 * polling function that poll the Variable service warehouseObject 
 * 
 */
  setWarehouse(){
    this.warehouseName = this.warehouseGlobal.warehouseObject.warehouseName;
    this.warehouseStreet = this.warehouseGlobal.warehouseObject.address;
    this.warehouseCity = this.warehouseGlobal.warehouseObject.city;
    this.warehouseState = this.warehouseGlobal.warehouseObject.state;
    this.warehouseZipcode = this.warehouseGlobal.warehouseObject.zipcode;
    this.warehouseCapacity = this.warehouseGlobal.warehouseObject.capacity;
   
  }
}
