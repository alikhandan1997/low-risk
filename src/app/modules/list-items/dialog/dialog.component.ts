import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  apiData;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: ServicesService
    ){
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  delete() {
    this.apiData = this.data.data.id
    if(this.data.type == 'learn'){
      this.http.deleteEducation(this.apiData).subscribe((data) => {
        console.log(data);
        location.reload();
      });
    } else if(this.data.type == 'news'){
      this.http.deleteNews(this.apiData).subscribe((data) => {
        console.log(data);
        location.reload();
      });
    } else if(this.data.type == 'analysis'){
      this.http.deleteAnalysis(this.apiData).subscribe((data) => {
        console.log(data);
        location.reload();
      });
    }
  }
}
