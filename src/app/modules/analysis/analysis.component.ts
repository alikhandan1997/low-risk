import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnalysisComponent implements OnInit {

  showTab: boolean = false;
  showShort: boolean = false;
  showMedium: boolean = false;
  showLong: boolean = false;
  showMain: boolean = true;

  constructor() { }

  ngOnInit(): void {
    console.log(window.location.href.split('/'))

    if(window.location.href.split('/').length == 6){
      this.showMain = false;
    }

    if(window.location.href.split('/')[3] == 'analysis' && window.location.href.split('/').length == 4) {
      this.showTab = true;
    }

    if(window.location.href.split('/')[4] == 'short') {
      this.showShort = true;
    } else if(window.location.href.split('/')[4] == 'medium'){
      this.showMedium = true;
    } else if(window.location.href.split('/')[4] == 'long'){
      this.showLong = true;
    }
  }

}
