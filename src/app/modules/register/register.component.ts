import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicesService } from 'src/app/modules/services/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  mobile;
  password;
  conf_password;
  captcha;
  dataObj: Object;

  captcha_image: string;
  captcha_key: string;

  mobileError = '';
  passwordError = '';
  confPasswordError = '';
  captchaError = '';


  constructor(
    private http: ServicesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.mobileError = '';
    this.passwordError = '';
    this.confPasswordError = '';
    this.captchaError = '';
    this.getCaptcha();
  }

  getCaptcha(){
    this.http.postCaptcha().subscribe((data) => {
      this.captcha_image = data["result"].captcha_image;
      this.captcha_key = data["result"].captcha_key;
    })
  }

  click(){
    console.log('name',this.mobile,'pass',this.password,'conf',this.conf_password,'captcha', this.captcha)
    this.dataObj = {
      mobile: this.mobile,
      password: this.password,
      confirm_password: this.conf_password,
      captcha_key: this.captcha_key,
      captcha_value: this.captcha
    }
    this.postLogin();
  }

  postLogin(){
    this.http.postRegister(this.dataObj).subscribe((data) => {
      if(data['status'] == 201) {
        this._snackBar.open('ثبت نام با موفقیت انجام شد', '', {
          duration: 3000,
        });
      }
    },
    (error) => {
      console.log(error['error']['messages'])
      if(error['status'] == 400 ) {
        if(error['error']['messages'][0]['code'] == '010000000') {
          this.ngOnInit();
          this._snackBar.open('اطلاعات را کامل وارد نمایید', '', {
            duration: 3000,
          });
        } else {
          this.ngOnInit();
          for(let i=0; i<error['error']['messages'].length; i++) {
            if(error['error']['messages'][i]['field'] == "mobile") {
              this.mobileError = error['error']['messages'][i]['message'];
            } else if(error['error']['messages'][i]['field'] == "password") {
              this.passwordError = error['error']['messages'][i]['message'];
            } else if(error['error']['messages'][i]['field'] == "confirm_password") {
              this.confPasswordError = error['error']['messages'][i]['message'];
            } else if(error['error']['messages'][i]['field'] == "captcha_value") {
              this.captchaError = error['error']['messages'][i]['message'];
            }
          }
        }
      }
      if(error['status'] == 401 || error['status'] == 500 ) {
        this.ngOnInit();
        this._snackBar.open('اطلاعات اشتباه است', '', {
          duration: 3000,
        });
      }
    });
  }

}
