import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  datadoughnut: any;

  constructor() { }

  ngOnInit(): void {
    //Doughnut Chart
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

}
