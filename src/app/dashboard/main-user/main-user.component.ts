import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.scss']
})
export class MainUserComponent implements OnInit {
  userListArray: any[] = []
  constructor(private sharedService:SharedService,private dialog:MatDialog) { }

  ngOnInit(): void {
  this.userListArray = this.sharedService.getItme('user') == [] ? [] : this.sharedService.getItme('user');  
  }



  deleteUser(id:any){
    
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width:'450px',
      minHeight:'177px',
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result){
        var index = this.userListArray.map( (x:any) => x.id).indexOf(id);
        this.userListArray.splice(index, 1);
        this.sharedService.setItem('user',this.userListArray)
      }
    }); 
  }

}

