import { KursService } from 'src/app/services/kurs.service';
import { Component, OnInit } from '@angular/core';
import { Kurs } from 'src/app/models/kurs.model';

@Component({
  selector: 'app-kurses',
  templateUrl: './kurses.component.html',
  styleUrls: ['./kurses.component.scss']
})
export class KursesComponent implements OnInit {
  kurses: Kurs[] = [];

  constructor(private kursService: KursService) { }

  ngOnInit() {
    this.kursService.getCurs();
    this.kursService.kursesChange.subscribe( kurses => {
      // console.log(kurses);
      this.kurses = kurses;
    });
  }

}
