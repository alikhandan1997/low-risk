import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/modules/services/services.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any){
  }

  ngOnInit(): void {
    this.getCaptcha();
    console.log("getting captcha")
  }

  save(){
    this.dialogRef.close();
    console.log(this.mobile,"lll",this.password,"lskdlksd",this.captcha, this.captcha_key);
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
      console.log(data);
      this.captcha_image = data["result"].captcha_image;
      this.captcha_key = data["result"].captcha_key;
    })
  }

  postLogin(){
    console.log(this.data)
    this.http.postLogin(this.data).subscribe((data) => {
      console.log(data);
    })
  }

}
