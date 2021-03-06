import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { Route, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ItemsComponent } from './items/items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { GoogleMapsModule } from '@angular/google-maps';
import {ChartModule} from 'primeng/chart';
import { MatSelectModule } from '@angular/material/select';
import { PrimaryThemeDirective } from './primary-theme.directive';
import { TextThemeDirective } from './text-theme.directive';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { DialogWarehouseComponent } from './dialog-warehouse/dialog-warehouse.component';
import {Menubar, MenubarModule} from 'primeng/menubar';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import {ListboxModule} from 'primeng/listbox';

const appRoute: Routes =[
  {
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    ItemsComponent,
    DashboardComponent,
    DialogComponent,
    PrimaryThemeDirective,
    TextThemeDirective,
    WarehouseComponent,
    DialogWarehouseComponent,
    WarehouseListComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    GoogleMapsModule,
    ChartModule,
    MatSelectModule,
    MenubarModule,
    ListboxModule


    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
