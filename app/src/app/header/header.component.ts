import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = "Rojesh";
  constructor(private nav: NavigationService) { }

  ngOnInit(): void {
  }

  toggleActive:boolean = false;

  toggleNav(){
    this.toggleActive = !this.toggleActive;
    this.nav.sideNavToggle();
    console.log('clicked');
  }

}