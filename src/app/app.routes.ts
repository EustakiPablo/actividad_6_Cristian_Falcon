import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'newuser', component: UserFormComponent},
    {path:'updateuser/:_id', component: UserFormComponent},
    {path: 'user/:_id', component: UserDetailComponent}
];
