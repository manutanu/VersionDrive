import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/internal/Subject';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private _loading: boolean = false;
  loadingStatus = new Subject();

  get loading():boolean {
    return this._loading;
  }

  set loading(value:boolean) {
    this._loading = value;
    this.loadingStatus.next(value);
    console.log("here i am"+this.loading);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}
