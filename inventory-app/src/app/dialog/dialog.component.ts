import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuilder : FormBuilder, private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent>){ }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['',Validators.required],
      category: ['',Validators.required], 
      quantity: ['',Validators.required], 
      price: ['',Validators.required], 
      serial: ['',Validators.required]

    });
    if(this.editData){
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['quantity'].setValue(this.editData.quantity);
      this.productForm.controls['serial'].setValue(this.editData.serial);
      this.actionBtn = "Update"
    }
  }

  //Post value from form to database
  addProduct(){
    console.log(this.productForm.value);
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postItem(this.productForm.value)
        .subscribe({
          next:(res) =>{
            //alert("Add successful")
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error Save")
          }
        })
      }
    }
    else{
      this.updateItem()
    }
  }
  updateItem(){
    this.api.putItem(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        console.log("Update Successful")
        this.productForm.reset();
        this.dialogRef.close('updated');
      },
      error:()=>{
        alert("Error Update")
      }
    })
  }

}
