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
  imageSrc:any = '';

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
    if(this.dialogType == 'deleteUser') {
      this.getUsers();
    }
  }

  getUsers() {
    this.apiData = `${this.userId}`;
    this.http.getAdminUsers(this.apiData).subscribe((data) => {
      this.userData.push(data['result'])
    })
  }

  close() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.http.deleteUsers(this.userId).subscribe((data) => {
      location.reload();
    })
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    }
    reader.readAsDataURL(file);
  }

  menuClick(type) {
    if(type == 'delete') {
      this.dialogType = 'deleteUser';
      this.ngOnInit();
    }else if(type == 'edit') {
      this.dialogType = 'editUser';
      this.ngOnInit();
    }else if(type == 'password') {
      this.dialogType = 'changePassword';
      this.ngOnInit();
    }
  }

}
