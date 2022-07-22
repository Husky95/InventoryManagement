import { ExpressionType } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { VariablesService } from '../variables.service'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuilder : FormBuilder, private api : ApiService, private warehouseleGlobal :  VariablesService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent>){ }
  ngOnInit(): void {
    
    this.productForm = this.formBuilder.group({
      itemName: ['',Validators.required],
      itemCategory: ['',Validators.required],
      itemCompany: ['',Validators.required],
      itemPrice: ['',Validators.required],
      itemQuantity: ['',Validators.required],
      warehouseID: ['',Validators.required],

    });
    if(this.editData){
      this.productForm.controls['itemName'].setValue(this.editData.itemName);
      this.productForm.controls['itemCategory'].setValue(this.editData.itemCategory);
      this.productForm.controls['itemCompany'].setValue(this.editData.itemCompany);
      this.productForm.controls['itemPrice'].setValue(this.editData.itemPrice);
      this.productForm.controls['itemQuantity'].setValue(this.editData.itemQuantity);
      this.productForm.controls['warehouseID'].setValue(this.editData.warehouseID);

      this.actionBtn = "Update"
    }
  }

  //Post value from form to database
  addProduct(){
    if (this.warehouseleGlobal.currentCapacity < parseInt(this.warehouseleGlobal.warehouseObject.capacity)){
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
    else{
      alert("Over Warehouse Capacity! Enter a smaller number for unit")
    }
  }
  updateItem(){
    let passData = this.editData;
    let tempData = this.editData;
    let oldQuantity = parseInt(this.editData.itemQuantity);

    passData.itemName=this.productForm.value.itemName;
    passData.itemCategory=this.productForm.value.itemCategory;
    passData.itemCompany=this.productForm.value.itemCompany;
    passData.itemPrice=this.productForm.value.itemPrice;
    passData.itemQuantity=this.productForm.value.itemQuantity;
    
    let newCurrentCapacity = this.warehouseleGlobal.currentCapacity;
    let inputQuantity = parseInt(passData.itemQuantity)
    console.log("Capacity Debug")
    console.log(newCurrentCapacity);
    console.log(oldQuantity);
    console.log(inputQuantity);

    newCurrentCapacity = newCurrentCapacity+(inputQuantity-oldQuantity)

    console.log(this.warehouseleGlobal.warehouseObject.capacity)
    if (newCurrentCapacity < this.warehouseleGlobal.warehouseObject.capacity){
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
    else{
      alert("Over Warehouse Capacity! Enter a smaller number for unit")
      this.editData=tempData;
      this.productForm.value.itemQuantity=tempData;
    }
  }


}
