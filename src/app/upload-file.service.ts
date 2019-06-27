import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
 
  constructor(private http: HttpClient) { }
 
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
    
    const header = new HttpHeaders().set("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
    const req = new HttpRequest('POST', 'http://localhost:8080/upload/'+sessionStorage.getItem("userid"), formdata, {headers:header,
      reportProgress: true,
      responseType: 'text',
    });
 
    return this.http.request(req);
  }

  pushFileVersionToStorage(file: File,fileid): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
    
    const header = new HttpHeaders().set("Authorization",`Bearer ${sessionStorage.getItem("token")}`);
    const req = new HttpRequest('POST', 'http://localhost:8080/uploadversion/'+sessionStorage.getItem("userid")+'/'+fileid, formdata, {headers:header,
      reportProgress: true,
      responseType: 'text',
    });
 
    return this.http.request(req);
  }
 
}