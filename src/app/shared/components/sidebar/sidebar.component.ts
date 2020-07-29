import { Component, Input, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/modules/services/services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  panelOpenState = false;
  isAdmin: boolean;
  permission;

  constructor(private http: ServicesService) {
  }

  ngOnInit(): void {
    this.http.getProfile().subscribe((data) => {
      this.isAdmin = data['result']['is_manager']
      localStorage.setItem('is_manager', data['result']['is_manager']);
      localStorage.setItem('permission', JSON.stringify(data['result']['permissions']));
    });
  }

}
