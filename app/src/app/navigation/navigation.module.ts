import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { Material } from '../modules/material.module';


@NgModule({
  declarations: [
    NavigationComponent,
    NavListComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    Material
  ]
})
export class NavigationModule { }
