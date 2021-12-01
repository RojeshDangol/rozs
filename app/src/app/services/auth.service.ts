import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment.dev';
//import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(data: any){
    let url = environment.BASE_URL+environment.Auth.register;
    return this.http.post<any>(url, data);
  }

  loginUser(data: any){
    let url = environment.BASE_URL+environment.Auth.login;
    return this.http.post<any>(url, data);
  }

  profile(){
    let url = environment.BASE_URL+environment.Auth.profile;
    return this.http.get<any>(url);
  }

  logOut(){
    return localStorage.removeItem('token');
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }


}
