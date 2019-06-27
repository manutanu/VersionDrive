import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  
  constructor(private router:Router) {
    if(sessionStorage.getItem('username')==='' || sessionStorage.getItem("token")==='')
    this.router.navigate(['/login']);
   }

  ngOnInit() {
  }

}
