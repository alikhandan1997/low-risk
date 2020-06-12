import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Input() status;
  register: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(){
    console.log(localStorage.getItem('access'))
    this.register = false
    if(localStorage.getItem('access') != null) {
      console.log("logged")
      this.register = true;
    }

    console.log(this.register)
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}

