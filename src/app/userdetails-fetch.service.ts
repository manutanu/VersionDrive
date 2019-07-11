import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserdetailsFetchService {
  listOfUserDetails;


  ngOnInit(): void {
    
  }

  constructor(private http:HttpClient) { }

  getListOfUsers(){
    
    // const header = new HttpHeaders().set("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
     return this.http.get(environment.urlstring+'/viewdownload/getallUserdetails');
     //.subscribe(
    //   response=>{
    //     for(let i=0; i< response.length;i++){
    //       let temp=new FileObjectForTransfere();
    //       temp.creationDate=response[i].creationDate.toString();
    //       temp.fileid=response[i].fileid;
    //       temp.filename=response[i].filename;
    //       //this.listOfFiles.push(temp);
    //       console.log(response[i].fileid+" "+response[i].filename+" "+response[i].creationDate.toString());
    //     }
    //   }
    // );
  }

}
