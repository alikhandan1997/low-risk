import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { FormBuilder, FormGroup } from "@angular/forms";

export interface User {
  email: string;
  first_name: string;
  id: number;
  image: any;
  is_manager: boolean;
  last_name: string;
  mobile: string;
  permission: any;
  username: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData: User[] = [];
  isEdit: boolean = false;
  imageSrc:any = '';
  userId;

  form: FormGroup;

  constructor(
    private http: ServicesService,
    public fb: FormBuilder
    ) {
      this.form = this.fb.group({
        first_name: [''],
        last_name: [''],
        mobile: [''],
        email: [''],
        image: ['']
      });
    }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.http.getProfile().subscribe((data) => {
      console.log(data['result']['id']);
      this.userId = data['result']['id'];
      this.userData.push(data['result']);

      this.form.controls['first_name'].setValue(data['result']['first_name']);
      this.form.controls['last_name'].setValue(data['result']['last_name']);
      this.form.controls['mobile'].setValue(data['result']['mobile']);
      this.form.controls['email'].setValue(data['result']['email']);
    })
  }

  edit(action) {
    if(action == 'edit') {
      this.isEdit = true;
    } else if(action == 'return') {
      this.isEdit = false;
    }
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

  submitForm() {
    console.log('submit data');
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

    this.http.putProfile(formData).subscribe((data) => {
      console.log(data);
      if(data['status'] == 200) {
        location.reload()
      }
    })
  }

}
