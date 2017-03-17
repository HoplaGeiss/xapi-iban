import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { IbanService } from './components/iban/iban.service';
import { BankService } from './components/bank/bank.service';

import { Bank } from './components/bank/bank';
import { IbanValidation } from './components/iban-validation/iban-validation';

@Component({
  selector: 'xapi-iban',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="xapi-iban">
      <form [formGroup]="ibanForm" (ngSubmit)="onSubmit()" novalidate>
        <div class="xapi-iban-label">IBAN</div>
        <input class="xapi-iban-input" placeholder="GB04BARC20474473160944" formControlName="iban">
        <button class="xapi-iban-submit" type="submit" [disabled]="ibanForm.pristine">Search</button>
        <div *ngIf="bank" class="xapi-iban-search-result">
          <p>Bank: {{ bank.bank }}</p>
          <p>Address: {{ bank.fullAddress }}</p>
        </div>

        <div *ngIf="validations" class="xapi-iban-search-result error">
          <p *ngFor="let validation of validations">
            {{validation | showErrors}}
          </p>
        </div>
      </form>
    </div>
  `
})
export class AppComponent {
  ibanForm: FormGroup;
  bank: Bank;
  validations: IbanValidation[];

  constructor(
    private fb: FormBuilder,
    private ibanService: IbanService,
    private bankService: BankService
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
                    .then(iban => {
                      this.bank = iban.bank;
                      this.bankService.getFullAddress(this.bank);
                      this.validations = iban.validations;
                    });
    }
}
