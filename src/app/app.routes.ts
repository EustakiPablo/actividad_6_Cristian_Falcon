import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'home', component: HomeComponent},
    {path:'newuser', component: UserFormComponent},
    {path:'updateuser/:_id', component: UserFormComponent}
];
