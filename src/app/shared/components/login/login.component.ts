import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/modules/services/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mobile;
  password;
  captcha;
  dataObj: Object;

  captcha_image: string;
  captcha_key: string;

  constructor(
    private http: ServicesService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar){
  }

  ngOnInit(): void {
    this.getCaptcha();
  }

  save(){
    this.data = {
      "username": this.mobile,
      "password": this.password,
      "captcha_key": this.captcha_key,
      "captcha_value": this.captcha
    }
    this.postLogin();
  }

  getCaptcha(){
    this.http.postCaptcha().subscribe((data) => {
      this.captcha_image = data["result"].captcha_image;
      this.captcha_key = data["result"].captcha_key;
    })
  }

  postLogin(){
    this.http.postLogin(this.data).subscribe((data) => {
      console.log(data)
      if(data['status'] == 200 ) {
        localStorage.setItem('access', data['result']['access']);
        localStorage.setItem('refresh', data['result']['refresh']);
        this.dialogRef.close();
        location.reload();
      }
    },
    (error) => {
      console.log(error);
      if(error['status'] == 400 || error['status'] == 500 ) {
        console.log('error');
        this.ngOnInit();
        this._snackBar.open('اطلاعات اشتباه است', '', {
          duration: 2000,
        });
      }
    })
  }

}
