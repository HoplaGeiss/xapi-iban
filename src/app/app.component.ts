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
          <md-hint>Bank: LLOYDS BANK PLC</md-hint>
        </md-input-container>
        <button class="xapi-iban-submit" md-raised-button type="submit" [disabled]="ibanForm.pristine" color="primary">Continue</button>
      </form>
    </div>
  `
})
export class AppComponent {
  ibanForm: FormGroup;
  bank: String;

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
    this.ibanService.search(this.ibanForm.get('iban').value)
                    .then(bank => this.bank = bank,
                          error => this.bank = 'We couldn\'t identify this IBAN');
    }
}
