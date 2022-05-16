import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm:FormGroup;
  submitted:boolean = false
  constructor(private formBuilder:FormBuilder, private datePipe:DatePipe,private sharedService:SharedService, private toastr:ToastrService, private router:Router) {

    this.userForm = this.formBuilder.group({
      name: ["", [Validators.required]],  
      email:["",[Validators.required,Validators.email]],  
      dob:["", [Validators.required]],   
      password: ["", [Validators.required,Validators.pattern(
        "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
      )]],
      business_name:['',[Validators.required]],
      branch: new FormArray([this.branchForm()])
  });
  }

  ngOnInit(): void {
    
  }

  branchForm(){
   return this.formBuilder.group({
      area_code:['',[Validators.required]],
      contact_no:['',[Validators.required]]
    })
  }

  get formControl(){
   return  this.userForm.controls
  }

  get formArr() {
    return this.userForm.get('branch') as FormArray;
  }

  addNewRow() {
    this.formArr.push(this.branchForm());
  }
  
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
  
  submitForm(): void{
    this.submitted = true;    
    var date = new Date;    
    if(this.userForm.valid){
      const param = {
        email: this.userForm.value.email,
        name: this.userForm.value.name,
        dob: this.datePipe.transform(this.userForm.value.dob,'yyyy-MM-dd'),
        password: this.userForm.value.password,
        business_name:this.userForm.value.business_name,
        branch:this.userForm.value.branch,
        id:this.datePipe.transform(date,'ddMMyyyyhhmmss')
      };
      console.log(this.userForm.value);
     var currentUser: any = this.sharedService.getItme('user') == [] ? [] : this.sharedService.getItme('user');
     currentUser.push(param);
     this.sharedService.setItem('user',currentUser);    
     this.toastr.success(`User added successfully`, 'Success');
     this.userForm.reset();
     this.router.navigate(['/dashboard']);
    }
  }

}
