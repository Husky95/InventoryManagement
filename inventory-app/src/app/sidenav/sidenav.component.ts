import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { VariablesService } from '../variables.service'

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  warehouseName = 'None'; 
  id : any;
  constructor(private warehouseGlobal : VariablesService ) {  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
/**
 * function to handle resize event of sidenav
 *
 * @param {event} event - an event when sidenave resize is trigger 
 */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
/**
 * init function that set the screenwidth and call set interval to poll warehouseName value
 *
 */
  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
      this.id = setInterval(() => {
        this.setWarehouseName(); 
      }, 100); 
  }
/**
 * function that handle when sidenav is toggle to big or small, emit a collapsed event with new screenwidth
 *
 */
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
/**
 * function that handle when close sidenav button is pressed, emit a collapsed event with new screenwidth
 *
 */
  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  /**
 * polling function to read warehouseName in Variables Service
 *
 */
  setWarehouseName(){
    this.warehouseName = this.warehouseGlobal.warehouseObject.warehouseName;
    
  }
}