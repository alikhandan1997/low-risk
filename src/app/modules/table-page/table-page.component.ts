import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ServicesService } from '../services/services.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogTableComponent } from './dialog-table/dialog-table.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Users {
  id: number;
  username: string;
  mobile: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  userSource: any;
  userColumns: string[];

  apiData = '';

  isUserList: boolean = false;
  userList: Users[];

  constructor(
    private http: ServicesService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    console.log(window.location.href.split('/'))
    if(window.location.href.split('/')[4] == "users") {
      this.isUserList = true;
      this.getUsers()
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userSource.filter = filterValue.trim();
  }

  getUsers() {
    this.http.getAdminUsers(this.apiData).subscribe((data) => {
      this.userList = data['result'];
      console.log(this.userList);
      this.userSource = new MatTableDataSource(this.userList);
      this.userColumns = ['id', 'username', 'mobile', 'delete', 'edit', 'pass','menu'];
    })
  }

  deleteUser(id) {
    const dialogRef = this.dialog.open(DialogTableComponent, {
      data:{
        type: 'deleteUser',
        userId: id
      },
      width: '350px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  editUser() {
    const dialogRef = this.dialog.open(DialogTableComponent, {
      data:{
        type: 'editUser'
      },
      width: '450px',
      height: '570px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  changeUserPassword(id){
    const dialogRef = this.dialog.open(DialogTableComponent, {
      data:{
        type: 'changePassword',
        userId: id
      },
      width: '350px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openMenu(id){
    const dialogRef = this.dialog.open(DialogTableComponent, {
      data:{
        type: 'menu',
        userId: id,
        panelClass: 'menu_box'
      },
      width: '400px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
