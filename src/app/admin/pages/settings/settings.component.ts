import { SettingsService } from './../../servises/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private settings: SettingsService) { }

  statusArr: [];

  ngOnInit() {
  }

  onUpdate() {
    this.settings.update().subscribe( result => {
      this.statusArr = result.status;
      // console.log(result);
    });
  }

  onClear() {
    this.settings.clear().subscribe( result => {
      console.log(result);
    });
  }

}
