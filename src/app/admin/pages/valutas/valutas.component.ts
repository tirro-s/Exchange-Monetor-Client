import { Component, OnInit } from '@angular/core';
import { ValService } from '../../servises/val-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Valuta } from '../../interfaces/valuta.interface';

@Component({
  selector: 'app-valutas',
  templateUrl: './valutas.component.html',
  styleUrls: ['./valutas.component.scss']
})
export class ValutasComponent implements OnInit {

  valutas: Valuta[] = [];
  form: FormGroup;
  idForUpdate: string;
  isLoading = false;

  constructor(private valService: ValService) { }

  ngOnInit() {
    this.form = new FormGroup({
      cod: new FormControl(null, Validators.required),
      desq: new FormControl(null, Validators.required)
    });
    this.isLoading = true;
    this.valService.fetch().subscribe( valutas => {
      this.valutas = valutas;
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (!this.idForUpdate) {
      this.valService.create(this.form.value.cod, this.form.value.desq).subscribe( result => {
        this.valutas.push(result);
        this.form.reset();
      });
    } else {
      this.valService.update(this.idForUpdate, this.form.value.cod, this.form.value.desq).subscribe( result => {
        this.valutas = this.valutas.map( val => {
          if (val._id !== this.idForUpdate) {
            return val;
          } else {
            return {
              ...val,
              cod: this.form.value.cod,
              desq: this.form.value.desq
            };
          }
        });
        this.idForUpdate = undefined;
        this.form.reset();
      });
    }
  }

  onDelete(id: string) {
    this.valService.delete(id).subscribe( result => {
      this.valutas = this.valutas.filter( val => val._id !== id);
    });
  }

  onSelect(id: string) {
    this.idForUpdate = id;
    const searchVal = this.valutas.find(val => {
      return val._id === id;
    });
    this.form.patchValue({
      cod: searchVal.cod,
      desq: searchVal.desq
    });
   }

   onClear() {
     this.form.reset();
     this.idForUpdate = undefined;
   }

}
