import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ServicesService } from 'src/app/modules/services/services.service';
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
  userName;
  userFamily;
  userAvatar;

  constructor(
    public dialog: MatDialog,
    private http: ServicesService
    ) {
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
    this.http.getProfile().subscribe((data) => {
      console.log(data);
      this.userName = data['result']['first_name'];
      this.userFamily = data['result']['last_name'];
      this.userAvatar = data['result']['image'];
    });
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

