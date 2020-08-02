import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from '../../services/services.service';
import { FormBuilder, FormGroup } from "@angular/forms";

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

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: ServicesService,
    public fb: FormBuilder
  ) {
    this.userId = this.data.userId
    this.dialogType = this.data.type;
    this.apiData = '';

    this.form = this.fb.group({
      first_name: [''],
      last_name: [''],
      mobile: [''],
      email: [''],
      image: ['']
    });

   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiData = `${this.userId}`;
    this.http.getAdminUsers(this.apiData).subscribe((data) => {
      console.log(data);
      this.imageSrc = data['result']['image'];
      this.userData.push(data['result']);

      this.form.controls['first_name'].setValue(data['result']['first_name']);
      this.form.controls['last_name'].setValue(data['result']['last_name']);
      this.form.controls['mobile'].setValue(data['result']['mobile']);
      this.form.controls['email'].setValue(data['result']['email']);
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

    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();

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

  editUser() {
    console.log('edit user')
    var formData: any = new FormData();
    formData.append("first_name", this.form.get("first_name").value);
    formData.append("last_name", this.form.get("last_name").value);
    formData.append("mobile", this.form.get("mobile").value);
    formData.append("email", this.form.get("email").value);
    if(this.form.get("image").value != ''){
      formData.append("image", this.form.get("image").value);
    }
    formData.append("id", this.userId);

    // for (var pair of formData.entries())
    // {
    //   console.log(pair[0]+ ', '+ pair[1]);
    // }

    this.http.putUsers(formData,this.userId).subscribe((data) => {
      console.log(data);
      if(data['status'] == 200) {
        location.reload();
      }
    })
  }

}
