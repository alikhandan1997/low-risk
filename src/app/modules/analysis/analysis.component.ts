import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalysisComponent implements OnInit {

  showShort: boolean = false;
  showMedium: boolean = false;
  showLong: boolean = false;
  showMain: boolean = false;

  apiData = '';

  shortAnalysis = [];
  mediumAnalysis = [];
  longAnalysis = [];

  mainShortAnalysis = [];
  mainMediumAnalysis = [];
  mainLongAnalysis = [];

  pageNumber = 1;
  pageSize;

  constructor(private http: ServicesService) { }

  ngOnInit(): void {

    if(window.location.href.split('/')[3] == 'analysis' && window.location.href.split('/').length == 4) {
      this.showMain = true;
    }

    if(window.location.href.split('/')[4] == 'short' && window.location.href.split('/').length == 5) {
      this.showShort = true;
    } else if(window.location.href.split('/')[4] == 'medium' && window.location.href.split('/').length == 5){
      this.showMedium = true;
    } else if(window.location.href.split('/')[4] == 'long' && window.location.href.split('/').length == 5){
      this.showLong = true;
    }

    this.getData(this.pageNumber);
  }

  getData(pageNumber) {

    // short analysis for main page
    this.apiData = '?type=1&page_size=4&last';
    this.http.getAnalysis(this.apiData).subscribe((data) => {
      console.log(data);
      this.shortAnalysis = data['result']['results'];
    });

    // medium analysis for main page
    this.apiData = '?type=2&page_size=4&last';
    this.http.getAnalysis(this.apiData).subscribe((data) => {
      console.log(data);
      this.mediumAnalysis = data['result']['results'];
    });

    // long analysis for main page
    this.apiData = '?type=3&page_size=4&last';
    this.http.getAnalysis(this.apiData).subscribe((data) => {
      console.log(data);
      this.longAnalysis = data['result']['results'];
    });

    // all short analysis for main page
    this.apiData = '?type=1&page_size=8&last';
    this.http.getAnalysis(this.apiData).subscribe((data) => {
      console.log(data, 'short');
      this.mainShortAnalysis = data['result']['results'];
      let numb = data['result']['count'];
      numb = numb / 8;
      this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
    });

    // all medium analysis for main page
    this.apiData = '?type=2&page_size=8&last';
    this.http.getAnalysis(this.apiData).subscribe((data) => {
      console.log(data,'medium');
      this.mainMediumAnalysis = data['result']['results'];
      let numb = data['result']['count'];
      numb = numb / 8;
      this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
    });

    // all long analysis for main page
    this.apiData = '?type=3&page_size=8&last';
    this.http.getAnalysis(this.apiData).subscribe((data) => {
      console.log(data, 'long');
      this.mainLongAnalysis = data['result']['results'];
      let numb = data['result']['count'];
      numb = numb / 8;
      this.pageSize = Array(Math.ceil(numb)).fill(1).map((x, i) => i + 1);
    });

  }

}
