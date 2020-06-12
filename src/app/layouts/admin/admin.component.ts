import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  status: string = 'admin';

  sideBarOpen: boolean = true;

  constructor( private router: Router) { }

  ngOnInit(): void {
    console.log(localStorage.length)
    if(localStorage.length == 0){
      this.router.navigate(['/']);
    }
  }

  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
