import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileListService, FileObjectForTransfere, FileObjectForShared } from '../file-list.service';
import { DomSanitizer} from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserdetailsFetchService } from '../userdetails-fetch.service';
import { ShareRequestObject } from '../dashboard/dashboard.component';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  closeResult: string;
  userid=sessionStorage.getItem("userid");
  fileListobject:FileObjectForShared[];
  viewfileurls=[];
  downloadfileurls=[];
  fileids=[];
  viewflag=[];
  fileType:String[]=[];
  private bodyText: string;
  formModelobject;
  useremails;

  //for the purpose of different versions of a file 
  versionListOfEachFile = [];
  versionListOfEachFileViewUrls: string[][] = [];
  versionListOfEachFileDownloadUrls: string[][] = [];

  constructor(private fileservice:FileListService,private sanitizer: DomSanitizer,private modalService: NgbModal,private form:FormBuilder,private router:Router,private http:HttpClient,private userservice:UserdetailsFetchService) { 
    
    if(sessionStorage.getItem('username')==='' || sessionStorage.getItem("token")==='')
    this.router.navigate(['/login']);
    
    this.allFetchLogic();

  }

  allFetchLogic(){
    
    this.fileservice.getAllSharedFiles().subscribe(data=>{
      this.fileListobject=data;
      //http://localhost:8080/viewdownload/view/{{userid}}/
      for(let i=0;i<this.fileListobject.length;i++){
          console.log("http://localhost:8080/viewdownload/view/"+this.fileListobject[i].ownerid+"/"+this.fileListobject[i].fileid);
          this.viewfileurls.push("http://localhost:8080/viewdownload/view/"+this.fileListobject[i].ownerid+"/"+this.fileListobject[i].fileid);
          this.downloadfileurls.push("http://localhost:8080/viewdownload/download/"+this.fileListobject[i].ownerid+"/"+this.fileListobject[i].fileid);
          this.viewflag.push(false);
          let name:String=this.fileListobject[i].filename;
          this.fileids.push(this.fileListobject[i].fileid);

          this.versionListOfEachFile.push(this.fileListobject[i].listOfVersionsOfSharedFiles);
        this.versionListOfEachFileViewUrls[i] = [];
        this.versionListOfEachFileDownloadUrls[i] = [];
        //for the purpose of versionlist view and downloads of versions
        for (let j = 0; j < this.versionListOfEachFile[i].length; j++) {
          console.log(this.versionListOfEachFile[i][j].versionname);
          this.versionListOfEachFileViewUrls[i].push("http://localhost:8080/viewdownload/viewversion/" + this.fileListobject[i].ownerid + "/" + this.versionListOfEachFile[i][j].versionname + "");
          this.versionListOfEachFileDownloadUrls[i].push("http://localhost:8080/viewdownload/downloadversion/" + this.fileListobject[i].ownerid + "/" + this.versionListOfEachFile[i][j].versionname);
          console.log(this.versionListOfEachFileViewUrls[i][j] + " urls " + this.versionListOfEachFileDownloadUrls[i][j]);
        }


          let type=name.substring((name.length-3),name.length);
          if(type === 'png' || type==='jpg'){
              this.fileType.push('image');
              this.viewfileurls[i]=this.sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
          }else if(type === 'mp3'){
              this.fileType.push('audio');
              this.viewfileurls[i]=this.sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
          }else if(type === 'mkv' || type===  'mp4'){
              this.fileType.push('video');
              this.viewfileurls[i]=this.sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
          }else if(type === 'pdf' || type === 'doc'){
            this.fileType.push('PDF');
            this.viewfileurls[i]=this.sanitizer.bypassSecurityTrustResourceUrl(this.viewfileurls[i]);
          }
          //console.log((name.length-(name.length-3))+"  "+name+" "+name.length+"  "+type+" t "+this.fileType);
      }
  },error =>{
    this.router.navigate(['/login']);
  });
  }


  ngOnInit() {
    this.userservice.getListOfUsers().subscribe(data => {
      this.useremails = data;
    });
  }


  view(index){
    this.viewflag[index]=!this.viewflag[index];
  }

download(index){
  window.open(this.downloadfileurls[index]);
}



open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    console.log(`with: ${reason}`);
    return  `with: ${reason}`;
  }
}

submitFormForShare(shareformdata,index){
  console.log(shareformdata.permission+" s "+shareformdata.useremail+" s "+index);
  this.shareformsubmissionflag=true;
  const header = new HttpHeaders().set("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
     return this.http.post('http://localhost:8080/viewdownload/share/'+this.fileids[index],new ShareRequestObject(shareformdata.useremail,sessionStorage.getItem("userid"),shareformdata.permission,this.fileids[index]) ,{headers:header})
     .subscribe(data =>{
          
     },
     error =>{
      this.shareformsubmissionflagerro=true;
     });
}

//dont know why i made this method
uploadVersion(index){

}

shareformsubmissionflag=false;
shareformsubmissionflagerro=false;
close(alert: Alert) {
  this.shareformsubmissionflag=false;
  this.shareformsubmissionflagerro=false;
}

public model: any;
public emailfromformdata:any;


formatter = (result: string) => result.toUpperCase();

search = (text$: Observable<string>) =>
text$.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  map(term => term === '' ? []
    : this.useremails.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
)

  //delete file 
  firstarray;
secondarray;
delete(index){
  this.fileservice.deletefile(this.fileListobject[index].fileid);
        console.log("deleted Successfully");
        this.firstarray=this.fileListobject.slice(0,index);
        this.secondarray=this.fileListobject.slice(index+1,this.fileListobject.length);
        console.log(this.fileListobject+" ss "+this.firstarray+" ss "+this.secondarray);
        this.fileListobject=[];
        for(let i=0;i<this.firstarray.length;i++){
            this.fileListobject.push(this.firstarray[i]);
        }
        for(let i=0;i<this.secondarray.length;i++){
            this.fileListobject.push(this.secondarray[i]);
        }
}


downloadVersion(i, j) {
  window.open(this.versionListOfEachFileDownloadUrls[i][j]);
}

}
