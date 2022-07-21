import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  //displayedColumns: string[] = ['productName', 'category', 'quantity', 'price','serial','action'];
  displayedColumns: string[] = ['itemID','itemName', 'itemCategory','itemCompany','itemPrice','itemQuantity','action'];

  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api : ApiService
            ) { }
  ngOnInit(): void {
    this.getAllItem();
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
  editItem(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'updated'){
        this.getAllItem();
      }
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
