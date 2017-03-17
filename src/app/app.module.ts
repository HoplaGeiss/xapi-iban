import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';

import { IbanService } from './components/iban/iban.service';
import { BankService } from './components/bank/bank.service';

import { ShowErrorsPipe } from './components/iban-validation/iban-validation.pipe'

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    ShowErrorsPipe
  ],
  providers: [
    IbanService,
    BankService
  ],
  bootstrap: [AppComponent],
  exports: [
    AppComponent
  ]
})
export class XapiIbanModule { }
