import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-analysis-detail',
  templateUrl: './analysis-detail.component.html',
  styleUrls: ['./analysis-detail.component.scss']
})
export class AnalysisDetailComponent implements OnInit {

  apiData;
  postId;
  postData = [];
  Date;
  analysisTypeNumber = '';
  analysisType = '';
  otherAnalysis = [];
  newList = [];

  constructor(private http: ServicesService) { }

  ngOnInit(): void {
    this.postId = window.location.href.split('/')[5];
    this.getData();
  }

  getData(){

    // get the main post data
    this.http.getAnalysis(this.postId).subscribe((data) => {
      this.Date = data['result']['created_at'];
      this.postData.push(data['result']);
      this.analysisTypeNumber = data['result']['type'];
      if(data['result']['type'] == 1) {
        this.analysisType = 'short';
      } else if(data['result']['type'] == 2){
        this.analysisType = 'medium';
      } else if(data['result']['type'] == 3) {
        this.analysisType = 'long';
      }
    });

    // get sub analysis from data
    this.apiData = `?type=${this.analysisTypeNumber}&page_size=3&last`;
    this.http.getAnalysis(this.apiData).subscribe((data) => {
      this.otherAnalysis = data['result']['results'];
      for(let i=0; i<this.otherAnalysis.length; i++) {
        if(this.otherAnalysis[i]['id'] == this.postId) {
          this.otherAnalysis.splice(i, 1);
        }
      }
      if(this.otherAnalysis.length == 3) {
        this.otherAnalysis.pop();
      }
    });

    // get news list from data
    this.apiData = '?page_size=6&last';
    this.http.getNews(this.apiData).subscribe((data) => {
      this.newList = data['result']['results'];
      console.log(this.newList)
    });

  }

}
