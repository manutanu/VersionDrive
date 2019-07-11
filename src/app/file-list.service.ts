import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

export class FileObjectForTransfere {

  public fileid;
  public filename;
  public creationDate;
  public shareList=[];
  public versionList=[];
}

export interface Status{
  status;
}
export class Share{


}

export class Version{

  
}

export class FileObjectForShared {

  public fileid;
  public filename;
  public creationDate;
  public ownerid;
  public ownername;
  public owneremail;
  public permission;
  public listOfVersionsOfSharedFiles;


}

@Injectable({
  providedIn: 'root'
})
export class FileListService implements OnInit {
  listOfFiles: FileObjectForTransfere[];


  ngOnInit(): void {

  }

  constructor(private http: HttpClient,private router:Router) { }

  getListOfFiles() {

    //const header = new HttpHeaders().set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    return this.http.get<FileObjectForTransfere[]>(environment.urlstring+'/viewdownload/getallfiles/' + sessionStorage.getItem("userid"));
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

  getAllSharedFiles() {
    // const header = new HttpHeaders().set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    // , { headers: header }
    return this.http.get<FileObjectForShared[]>(environment.urlstring+'/viewdownload/shared/' + sessionStorage.getItem("userid"));
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

  deletefile(fileid) {
    // const header = new HttpHeaders().set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    // , { headers: header }
    return this.http.get(environment.urlstring+'/viewdownload/deletefile/' + sessionStorage.getItem("userid") + "/" + fileid).subscribe(data => {
      
    });
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

  deletefileFromShare(fileid,userid) {
    // const header = new HttpHeaders().set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    // , { headers: header }
    console.log("what is your problem bro "+fileid+"   "+userid);
    return this.http.get(environment.urlstring+'/viewdownload/deletefile/' + userid + "/" + fileid).subscribe(data => {
      
    });
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

  deleteFileVersion(url){
    // const header = new HttpHeaders().set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
    // , { headers: header }
    let responsedata;
    return this.http.get<Status>(url).subscribe(data => {
      responsedata=data.status;
      console.log(responsedata);
    });
  }

}
