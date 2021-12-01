import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private sideNav!: MatSidenav;

  constructor() { }

  public setSideNav(sideNav: MatSidenav){
    this.sideNav = sideNav;
  }

  public sideNavToggle(){
    this.sideNav.toggle();
  }

  

}
