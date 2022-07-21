import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogWarehouseComponent } from '../dialog-warehouse/dialog-warehouse.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  //displayedColumns: string[] = ['productName', 'category', 'quantity', 'price','serial','action'];
  displayedColumns: string[] = ['warehouseID','warehouseName', 'address','city','state','zipcode','capacity','action'];

  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api : ApiService
            ) { }
  ngOnInit(): void {
    this.getAllWarehouse();
  }

  openDialog(){
    this.dialog.open(DialogWarehouseComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllWarehouse(); 
      }
    })
  }
  getAllWarehouse(){
    this.api.getWarehouse()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editWarehouse(row : any){
    this.dialog.open(DialogWarehouseComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'updated'){
        this.getAllWarehouse();
      }
    })
  }
  deleteWarehouse(id : number){
    console.log(id);
    this.api.deleteWarehouse(id)
    .subscribe({
      next:(res)=>{
        console.log("Delete Susccess");
        this.getAllWarehouse();
      },
      error:()=>{
        console.log("Delete Error");
      }
    })
  }
}
