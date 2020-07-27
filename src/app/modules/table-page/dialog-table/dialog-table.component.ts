import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-dialog-table',
  templateUrl: './dialog-table.component.html',
  styleUrls: ['./dialog-table.component.scss']
})
export class DialogTableComponent implements OnInit {

  userId:number;
  dialogType:string;
  apiData: string;
  userData = [];

  constructor(
    public dialogRef: MatDialogRef<DialogTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: ServicesService
  ) {
    this.userId = this.data.userId
    this.dialogType = this.data.type;
    this.apiData = '';
   }

  ngOnInit(): void {
    console.log(this.userId)
    console.log(this.dialogType)
    if(this.dialogType == 'deleteUser') {
      this.getUsers();
    }
  }

  getUsers() {
    this.apiData = `${this.userId}`;
    this.http.getAdminUsers(this.apiData).subscribe((data) => {
      console.log(data);
      this.userData.push(data['result'])
      console.log(this.userData)
    })
  }

  close() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.http.deleteUsers(this.userId).subscribe((data) => {
      console.log(data);
      location.reload();
    })
  }

}
