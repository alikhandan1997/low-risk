import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/modules/services/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  userError = '';
  passError = '';
  captchaError = '';

  constructor(
    private http: ServicesService,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private router: Router){
  }

  ngOnInit(): void {
    this.getCaptcha();
  }

  save(){
    this.dataObj = {
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
    this.http.postLogin(this.dataObj).subscribe(data => {
      if(data['status'] == 200 ) {
        localStorage.setItem('access', data['result']['access']);
        localStorage.setItem('refresh', data['result']['refresh']);
        this.http.getProfile().subscribe((data) => {
          console.log(data['result']['permissions'],'permission');
          localStorage.setItem('permission', JSON.stringify(data['result']['permissions']));
        });
        this.dialogRef.close();
        this.router.navigate(['admin']);
      }
    },
    error => {
      for(let i=0; i<error['error']['messages'].length; i++) {
        if(error['error']['messages'][0]['code'] == "00000000") {
          this.captchaError = '';
          this.ngOnInit();
          this._snackBar.open('حساب کاربری با این اطلاعات وجود ندارد', '', {
            duration: 2000,
          });
        }
        if(error['error']['messages'][i]['field'] == "non_field_errors") {
          this.captchaError = error['error']['messages'][i]['message'];
          this.ngOnInit();
        }
        if(error['error']['messages'][i]['message'] == "required") {
          this.captchaError = '';
          this.ngOnInit();
          this._snackBar.open('اطلاعات را کامل وارد کتید', '', {
            duration: 2000,
          });
        }
      }
    })
  }

}
