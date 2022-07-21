import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog-warehouse',
  templateUrl: './dialog-warehouse.component.html',
  styleUrls: ['./dialog-warehouse.component.scss']
})
export class DialogWarehouseComponent implements OnInit {

  productForm !: FormGroup;
  actionBtn : string = "Save";
  constructor(private formBuilder : FormBuilder, private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogWarehouseComponent>){ }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      warehouseName: ['',Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zipcode: ['',Validators.required],
      capacity: ['',Validators.required]
    });
    if(this.editData){
      this.productForm.controls['warehouseName'].setValue(this.editData.warehouseName);
      this.productForm.controls['address'].setValue(this.editData.address);
      this.productForm.controls['city'].setValue(this.editData.city);
      this.productForm.controls['state'].setValue(this.editData.state);
      this.productForm.controls['zipcode'].setValue(this.editData.zipcode);
      this.productForm.controls['capacity'].setValue(this.editData.capacity);

      this.actionBtn = "Update"
    }
  }

  //Post value from form to database
  addWarehouse(){
    console.log(this.productForm.value);
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postWarehouse(this.productForm.value)
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
      this.updateWarehouse()
    }
  }
  updateWarehouse(){
    let passData = this.editData;
    passData.warehouseName=this.productForm.value.warehouseName;
    passData.street=this.productForm.value.street;
    passData.city=this.productForm.value.city;
    passData.state=this.productForm.value.state;
    passData.zipcode=this.productForm.value.zipcode;

    this.api.putWarehouse(passData)
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

