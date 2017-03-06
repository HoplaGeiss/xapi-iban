import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { IbanService } from './shared/iban.service';

@Component({
  selector: 'xapi-iban',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="xapi-iban">
      <form [formGroup]="ibanForm" (ngSubmit)="onSubmit()" novalidate>
        <md-input-container class="xapi-iban-input">
          <input mdInput placeholder="IBAN" formControlName="iban">
        </md-input-container>
        <button class="xapi-iban-submit" md-raised-button type="submit" [disabled]="ibanForm.pristine" color="primary">Continue</button>
      </form>
      <p>{{bank | async}}
    </div>
  `
})
export class AppComponent {
  ibanForm: FormGroup;
  bank: Observable<String>;

  constructor(
    private fb: FormBuilder,
    private ibanService: IbanService
  ) {
    this.createForm();
  }

  createForm() {
    this.ibanForm = this.fb.group({
      iban: ''
    });
  }

  onSubmit() {
    this.ibanService.search(this.ibanForm.get('iban').value);
  }
}
