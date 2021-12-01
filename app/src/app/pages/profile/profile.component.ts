import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any = {};

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.displayProfile();
  }

    displayProfile(){
      this.auth.profile()
        .subscribe((newData: any)=>{
          this.data = newData;
          console.log(newData);
        });
    }

}
