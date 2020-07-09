import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {

  postId

  constructor(private http: ServicesService) { }

  ngOnInit(): void {
    this.postId = window.location.href.split('/')[5];

    console.log(this.postId)

    this.getData();
  }

  getData(){

  }

}
