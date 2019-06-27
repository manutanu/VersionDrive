import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class JwtRequest{
    constructor(public username: String ,public password:String){
    }
}

export class JwtResponse{
    private token;
    private userid;
}

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html'
})
export class LoginComponent{

    formModelobject;
    jwtresponse;

    constructor(private form:FormBuilder,private router:Router,private http:HttpClient){
        this.formModelobject=this.form.group({
            username:'',
            password:''
        });
    }

    onSubmit(formmodeldata){
         let flag;
        console.log(formmodeldata.username+" "+formmodeldata.password);
        let obs= this.http.post<JwtResponse>("http://localhost:8080/authenticate", new JwtRequest(formmodeldata.username,formmodeldata.password));
        obs.subscribe(data => {
            this.jwtresponse=data;
            if(this.jwtresponse.token.length>0)
                flag=true;

            console.log(this.jwtresponse.token);
            sessionStorage.setItem("token",this.jwtresponse.token);
            sessionStorage.setItem("username",formmodeldata.username);
            sessionStorage.setItem("userid",this.jwtresponse.userid);
            this.router.navigate(['/dashboard']);

        },
        error => {
            flag=false;
            window.alert("Sorry you are not in our family ");
        }
        );
    }


}