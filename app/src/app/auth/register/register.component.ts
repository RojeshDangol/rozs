import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    })
  }

  onSubmit(data: any){
    this.registerUser(data);
  }

  registerUser(data: any){
    this.auth.registerUser(data).subscribe(
      (res: any)=>{console.log(res);
        //then login
         this.auth.loginUser(data).subscribe(
           (res: { token: string; })=>{
            console.log(res);
            localStorage.setItem('token', res.token)},
           (err: any)=>{console.log(err)}
          );
        },
      (err: { error: any; })=>{alert(err.error)}
    ); 
    
  }

  loginUser(data:any){
    this.auth.loginUser(data).subscribe(
      (res: { token: string; })=>{
            console.log(res);
            localStorage.setItem('token', res.token)},
      (err: any)=>{console.log(err)}
          );
  }

}
