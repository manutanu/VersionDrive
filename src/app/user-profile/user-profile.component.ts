import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



export class UserObject{
  private username;
  private email;
}

export class Transaction{

  public actionTaken;
  public fileName;
  public fromemail;
  public toemail;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  transactionList:Transaction[]=[];

  constructor(private router:Router,private http:HttpClient) {
    if(sessionStorage.getItem('username')==='' || sessionStorage.getItem("token")==='')
    this.router.navigate(['/login']);
   }

   userProfileObject:UserObject;
  ngOnInit() {
    const header = new HttpHeaders().set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    this.http.get<UserObject>('http://localhost:8080/viewdownload/getUserProfile/' + sessionStorage.getItem("userid"), { headers: header })
      .subscribe(data => {
        console.log(data);
        this.userProfileObject=data;
      },
        error => {
        });

        this.http.get<Transaction[]>('http://localhost:8080/viewdownload/activity/' + sessionStorage.getItem("userid"), { headers: header })
      .subscribe(data => {
        console.log(data);
        this.transactionList=data;
        console.log(this.transactionList[0].actionTaken);
      },
        error => {
        });
        
  }



}
