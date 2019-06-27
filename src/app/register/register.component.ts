import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Alert {
  type: string;
  message: string;
}

export class RegisterRequest{
  constructor(private username,
  private password,
  private email,
  ){}

}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerflag=false;
  errormessageFlagusername=false;
  errormessageFlaguseremail=false;
  ngOnInit(): void {

  }
  formModelobject;
  registerresponse;

  constructor(private form:FormBuilder,private router:Router,private http:HttpClient){
      this.formModelobject=this.form.group({
          username:'',
          password:'',
          email:''
      });
  }

  onSubmit(formmodeldata){
      console.log(formmodeldata.username+" "+formmodeldata.password +" "+formmodeldata.email);
      let obs= this.http.post("http://localhost:8080/register", new RegisterRequest(formmodeldata.username,formmodeldata.password,formmodeldata.email));
      obs.subscribe(data => {
          this.registerresponse=data;
          if(this.registerresponse.status.length>0){
            if(this.registerresponse.status=== 'SUCCESS'){
            this.registerflag=true;
            }else if(this.registerresponse.status === 'Username'){
              this.errormessageFlagusername=true;
            }else if(this.registerresponse.status === 'Useremail'){
              this.errormessageFlaguseremail=true;
            }
          }
      },
      error => {
          window.alert("Sorry you are not in our family ");
      }
      );
  }

  close(alert: Alert) {
      this.registerflag=false;
      this.errormessageFlaguseremail=false;
      this.errormessageFlagusername=false;
  }
}
