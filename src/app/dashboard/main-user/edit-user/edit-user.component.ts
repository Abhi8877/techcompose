import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm:FormGroup;
  submitted:boolean = false;
  userId?: string;
  constructor(private formBuilder:FormBuilder, private datePipe:DatePipe,private sharedService:SharedService, private toastr:ToastrService, private router:Router,private activatedRoute:ActivatedRoute) {

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
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'] ? params['id'] : null;  
      if(this.userId){
        var currentUser: any = this.sharedService.getItme('user') == [] ? [] : this.sharedService.getItme('user');
        var userDetail = currentUser?.filter((x:any) => {return x.id  ==  this.userId})[0];        
        if(userDetail){
          this.setUserFormData(userDetail)
        } else {
          this.toastr.error(`User does not exist`, 'Error');
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.toastr.error(`User does not exist`, 'Error');
        this.router.navigate(['/dashboard']);
      }
    }); 
  }


  setUserFormData(userDetail: any){
    console.log(userDetail);
    
    this.userForm.patchValue({
      name:userDetail.name,  
      email:userDetail.email,  
      dob:userDetail.dob,   
      password:userDetail.password,
      business_name:userDetail.business_name,
 //     branch: this.formBuilder.array([])
  }); 
  //   for (let x of userDetail.branch) {
  //     this.userForm.controls['branch'].setValue({
  //       area_code: x.area_code,
  //       contact_no: x.contact_no
  //   })

  // }
  this.setValue(userDetail.branch)
  }

  setValue(item: any[]) {
    const formArray = new FormArray([]);
    for (let x of item) {
      formArray.push(this.formBuilder.group({
        area_code: x.area_code,
              contact_no: x.contact_no
      }));
    }
    this.userForm.setControl('branch', formArray);
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
    if(this.userForm.valid){
      const param = {
        email: this.userForm.value.email,
        name: this.userForm.value.name,
        dob: this.datePipe.transform(this.userForm.value.dob,'yyyy-MM-dd'),
        password: this.userForm.value.password,
        business_name:this.userForm.value.business_name,
        branch:this.userForm.value.branch,
        id:this.userId
      };
      var currentUser: any = this.sharedService.getItme('user') == [] ? [] : this.sharedService.getItme('user');
      var index = currentUser.map( (x:any) => x.id).indexOf(this.userId);
      currentUser[index] = param;
      this.sharedService.setItem('user',currentUser);    
      this.toastr.success(`User updated successfully`, 'Success');
      this.userForm.reset();
      this.router.navigate(['/dashboard']);
    }

  
  }

}
