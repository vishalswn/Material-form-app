import { Component, ChangeDetectorRef,SimpleChanges } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
//import { Observable } from 'rxjs';
import { ConfirmedValidator } from 'src/app/confirmvalidator'; 
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

//import {MatDatepickerModule} from '@angular/material/datepicker';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

    minDate: Date;
    maxDate: Date;

    result: string = '';

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'Gender','action'];
  
  data = Object.assign(this.getlocalstoragedata());
  dataSource = new MatTableDataSource<any>(this.data);
  

  ELEMENT_DATA:any=[];
  
  data1:any=[];
  data2:any=[];
  retrievedObject;
  getdata;
  item;
  //tableColumns  :  string[] = ['policyNumber', 'creationDate', 'expireDate', 'policyAmount', 'clientId', 'employeeId'];
  addressForm = this.fb.group({
   // company: null,
    firstName: [null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]],
    lastName: [null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]*$/)]],
    //address: [null, Validators.required],
   // address2: null,
    email:[null,[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    date: [null],
    gender: [null,[Validators.required]],
    password: [null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]],
    confirmpassword: [null,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/)]]
    //shipping: ['free', Validators.required]
  },
   { 
    validator: ConfirmedValidator('password', 'confirmpassword')
   }
  );
  
  hasUnitNumber = false;
  
  gender = [
    {name: 'Male', abbreviation: 'ML'},
    {name: 'Female', abbreviation: 'FL'},
    {name: 'Other', abbreviation: 'OS'}
  ];

  constructor(private fb: FormBuilder, public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 15, 0, 0);
    this.maxDate = new Date();
    //debugger
    // this.data1 = JSON.parse(localStorage.getItem('formvalue'));
  }
  

 ngOnInit() {
    // this.data1 = this.getlocalstoragedata();
    // const ELEMENT_DATA: PeriodicElement[] = this.getlocalstoragedata();
    // if(this.getlocalstoragedata()) this.dataSource = this.getlocalstoragedata();
     //debugger
  }
  
  confirmDialog(id: number, index: number){

    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.data.splice(index, 1);
        this.dataSource = new MatTableDataSource<any>(this.data);
        localStorage.setItem("formvalue", JSON.stringify(this.data));
      }
      
    });

     // this.item = JSON.stringify(this.data1); // Restoring object left into items again
     // localStorage.setItem("formvalue", this.item);
  }

  onSubmit() {
    var id = Math.floor(1000 + Math.random() * 9000);
    this.addressForm.value.id = id;
    this.data.push(this.addressForm.value);
    this.dataSource = new MatTableDataSource<any>(this.data);
    console.log(this.dataSource);
    localStorage.setItem('formvalue', JSON.stringify(this.data));
    this.changeDetectorRefs.detectChanges();
    this.addressForm.reset();
  }

  getlocalstoragedata(){
    return JSON.parse(localStorage.getItem("formvalue")) || [];
  }

}