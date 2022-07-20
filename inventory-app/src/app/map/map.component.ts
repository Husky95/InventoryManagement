import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map:any;
  icon = {
    icon: L.icon({
      iconSize: [ 50, 50 ],
      iconAnchor: [ 0, 0 ],
      // specify the path here
      iconUrl: './assets/marker.png',
   })
};
  ngOnInit() {
    this.map = L.map("map").setView([46.879966, -121.726909], 7);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    var marker = L.marker([17.385044, 78.486671],this.icon);
    marker.addTo(this.map);

  }
}