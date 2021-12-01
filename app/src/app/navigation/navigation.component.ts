import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(private auth: AuthService, private nav: NavigationService) { }

  ngOnInit(): void {
  }

  loggedIn(){
    return this.auth.loggedIn();
  }

  ngAfterViewInit(): void{
    this.nav.setSideNav(this.sidenav);
  }


}
