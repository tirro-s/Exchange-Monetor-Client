import { KursService } from 'src/app/services/kurs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  valutas = [];
  // from = 'ADVCUSD';
  // to = 'P24UAH';

  constructor(private kursService: KursService) { }

  ngOnInit() {
    this.kursService.getValuta().subscribe(valutas => {
      this.valutas = valutas;
    });
  }

  onClickFrom(val: string) {
    if (this.kursService.to === val) {
      return;
    }
    this.kursService.from = val;
    this.kursService.getCurs();
  }

  onClickTo(val: string) {
    if (this.kursService.from === val) {
      return;
    }
    this.kursService.to = val;
    this.kursService.getCurs();
  }

}
