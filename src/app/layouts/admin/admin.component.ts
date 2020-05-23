import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  status: string = 'admin';

  sideBarOpen: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(event) {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
