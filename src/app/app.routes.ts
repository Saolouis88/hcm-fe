import { ListComponent } from './list/list.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditUserComponent } from './edit-users/edit-users.component';

export const routes: Routes = [
  {
    path: 'users',
    component: ListComponent,
  },
  {
    path: 'add-users',
    component: AddUsersComponent,
  },

  {
    path: 'edit-users/:idUser',
    component: EditUserComponent,
  },

  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
