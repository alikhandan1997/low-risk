import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/modules/services/services.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  mobile;
  password;
  conf_password;
  captcha;
  dataObj: Object;

  captcha_image: string;
  captcha_key: string;


  constructor( private http: ServicesService) { }

  ngOnInit(): void {
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
      "mobile": this.mobile,
      "password": this.password,
      "confirm_password": this.conf_password,
      "captcha_key": this.captcha_key,
      "captcha_value": this.captcha
    }
    this.postLogin();
  }

  postLogin(){
    this.http.postRegister(this.dataObj).subscribe((data) => {
      console.log(data)
    })
  }

}
