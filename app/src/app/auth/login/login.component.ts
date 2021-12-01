import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
              private fb: FormBuilder, 
              private auth: AuthService, 
              private router: Router
              ) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    })
  }

  onSubmit(data: any){
    return this.auth.loginUser(data).subscribe(
      (res: { token: string; })=>{
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile']);
        
      },
      (err: { error: any; })=>{
        alert(err.error);
      }
    )
  }
}
