import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogWarehouseComponent } from '../dialog-warehouse/dialog-warehouse.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { VariablesService } from '../variables.service'

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
  constructor(private dialog: MatDialog, private api : ApiService, private warehouseGlobal : VariablesService ) { }
  /**
 * init function that call getAllItem() to populate the table element
 *
 */
  ngOnInit(): void {
    this.getAllWarehouse();
  }
  /**
 *  function that open the dialog box component
 * 
 */
  openDialog(){
    this.dialog.open(DialogWarehouseComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllWarehouse(); 
      }
    })
  }
  /**
 *  function that call a postWarehouse() service function that return all the item in the warehoyuse table
 *  then it populate all the table field by passing the post resp to MatTableDataSource
 */
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
  /**
 *  boiler plate template filter function of the material-angular table component
 *  
 */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
   /**
 *  function that open a dialog box when user pressed the edit icon
 *  after dialog box close it update the table with new value
 *  
 */
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
/**
 *  function that delete an Warehouse table row when user pressed the delete icon
 *  after dialog box close it update the table with new value
 *  
 */
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
