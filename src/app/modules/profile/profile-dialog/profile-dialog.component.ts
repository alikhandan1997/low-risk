import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {

  imageSrc:any = '';

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    }
    reader.readAsDataURL(file);
  }

}
