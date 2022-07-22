import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { VariablesService } from '../variables.service'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  //displayedColumns: string[] = ['productName', 'category', 'quantity', 'price','serial','action'];
  displayedColumns: string[] = ['itemID','itemName', 'itemCategory','itemCompany','itemPrice','itemQuantity','warehouseID','action'];

  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api : ApiService, private warehouseGlobal : VariablesService
            ) { }
  id : any;
  ngOnInit(): void {
    this.getAllItem();
    //this.id = setInterval(() => {
      //this.getAllItem(); 
    //}, 1000);   
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  openDialog(){
    this.dialog.open(DialogComponent,{
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllItem(); 
      }
    })
  }
  getAllItem(){
    this.api.getItem()
    .subscribe({
      next:(res)=>{
        console.log("res")
        console.log( res);
        let temp = []
        for(let i=0; i<res.length; i++){
          if(res[i].warehouseID != this.warehouseGlobal.warehouseObject.warehouseID ){
            continue;
          }
          else{
           temp.push(res[i])
          }
        }
        let totalItemCapacity = 0
        for(let i=0;i<temp.length; i++)
        {
          totalItemCapacity = totalItemCapacity + temp[i].itemQuantity;
        }
        console.log(totalItemCapacity);
        this.warehouseGlobal.currentCapacity = totalItemCapacity;
        this.dataSource = new MatTableDataSource(temp);
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
  editItem(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'updated'){
        this.getAllItem();
      }
      this.getAllItem();
    })
  }
  deleteItem(id : number){

    console.log(id);
    this.api.deleteItem(id)
    .subscribe({
      next:(res)=>{
        console.log("Delete Susccess");
        this.getAllItem();
      },
      error:()=>{
        console.log("Delete Error");
      }
    })
  }
}
