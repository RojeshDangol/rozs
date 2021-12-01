import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {path:'', component: ProjectsComponent},

  {path:'calculator', loadChildren:()=>import('../projects/calculator/calculator.module').then(m=>m.CalculatorModule)}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
