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
  isAdmin;

  constructor(public dialog: MatDialog) {
    this.isAdmin = false;
  }

  ngOnInit(){
    this.register = false
    if(localStorage.getItem('access') != null) {
      this.register = true;
    }
    if(window.location.href.split('/')[3] == 'admin') {
      this.isAdmin = true;
    }
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '430px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    localStorage.clear();
    location.reload();
  }

}

