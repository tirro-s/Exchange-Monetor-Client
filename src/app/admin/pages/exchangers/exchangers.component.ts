import { Component, OnInit } from '@angular/core';
import { ExService } from '../../servises/ex-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exchanger } from '../../interfaces/exchanger.interface';

@Component({
  selector: 'app-exchangers',
  templateUrl: './exchangers.component.html',
  styleUrls: ['./exchangers.component.scss']
})
export class ExchangersComponent implements OnInit {

  exchangers: Exchanger[] = [];
  form: FormGroup;
  idForUpdate: string;
  isLoading = false;

  constructor(private exService: ExService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      partlink: new FormControl(null, Validators.required),
      xmlpath: new FormControl(null, Validators.required)
    });
    this.isLoading = true;
    this.exService.fetch().subscribe( exch => {
      this.exchangers = exch;
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (!this.idForUpdate) {
      this.exService.create(this.form.value.name, this.form.value.partlink, this.form.value.xmlpath).subscribe( result => {
        this.exchangers.push(result);
        this.form.reset();
      });
    } else {
      this.exService.update(
        this.idForUpdate, this.form.value.name, this.form.value.partlink, this.form.value.xmlpath).subscribe( result => {
        this.exchangers = this.exchangers.map( ex => {
          if (ex._id !== this.idForUpdate) {
            return ex;
          } else {
            return {
              ...ex,
              name: this.form.value.name,
              partlink: this.form.value.partlink,
              xmlpath: this.form.value.xmlpath
            };
          }
        });
        this.idForUpdate = undefined;
        this.form.reset();
      });
    }
  }

  onDelete(id: string) {
    this.exService.delete(id).subscribe( result => {
      this.exchangers = this.exchangers.filter( ex => ex._id !== id);
    });
  }

  onSelect(id: string) {
    this.idForUpdate = id;
    const searchEx = this.exchangers.find(ex => {
      return ex._id === id;
    });
    this.form.patchValue({
      name: searchEx.name,
      partlink: searchEx.partlink,
      xmlpath: searchEx.xmlpath
    });
   }

   onClear() {
     this.form.reset();
     this.idForUpdate = undefined;
   }

}
