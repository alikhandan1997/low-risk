import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  status: string = 'main';

  constructor() { }

  ngOnInit(): void {
    console.log(window.location.href.split('/')[3]);
  }

}
