import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './dashboard/main-user/add-user/add-user.component';
import { EditUserComponent } from './dashboard/main-user/edit-user/edit-user.component';
import { MainUserComponent } from './dashboard/main-user/main-user.component';

const routes: Routes = [ { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
                         { path: 'dashboard', component:MainUserComponent },
                         { path: 'add-user', component:AddUserComponent },
                         { path: 'edit-user/:id', component:EditUserComponent }
                        ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
