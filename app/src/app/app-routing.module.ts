import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfileModule } from './pages/profile/profile.module';

const routes: Routes = [
  {path:'', loadChildren:()=>import('../app/pages/home/home.module').then(m=>m.HomeModule)},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'logout', component: LogoutComponent},

  {path:'home', loadChildren:()=>import('../app/pages/home/home.module').then(m=>m.HomeModule)},
  {path:'profile', canActivate: [AuthGuard], loadChildren:()=>import('../app/pages/profile/profile.module').then(m=>m.ProfileModule)},
  {path:'projects', loadChildren:()=>import('../app/pages/projects/projects.module').then(m=>m.ProjectsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
