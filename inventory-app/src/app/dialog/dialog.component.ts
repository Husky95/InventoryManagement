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
      itemName: ['',Validators.required],
      itemCategory: ['',Validators.required],
      itemCompany: ['',Validators.required],
      itemPrice: ['',Validators.required],
      itemQuantity: ['',Validators.required],
    });
    if(this.editData){
      this.productForm.controls['itemName'].setValue(this.editData.itemName);
      this.productForm.controls['itemCategory'].setValue(this.editData.itemCategory);
      this.productForm.controls['itemCompany'].setValue(this.editData.itemCompany);
      this.productForm.controls['itemPrice'].setValue(this.editData.itemPrice);
      this.productForm.controls['itemQuantity'].setValue(this.editData.itemQuantity);
      this.actionBtn = "Update"
    }
  }

  //Post value from form to database
  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postItem(this.productForm.value)
        .subscribe({
          next:(res) =>{
            alert("Add successful")
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
    let passData = this.editData;
    passData.itemName=this.productForm.value.itemName;
    passData.itemCategory=this.productForm.value.itemCategory;
    passData.itemCompany=this.productForm.value.itemCompany;
    passData.itemPrice=this.productForm.value.itemPrice;
    passData.itemQuantity=this.productForm.value.itemQuantity;

    this.api.putItem(passData)
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
