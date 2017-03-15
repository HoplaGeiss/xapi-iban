import { Injectable } from '@angular/core';

import { Bank } from '../bank/bank';

@Injectable()
export class BankService {

  constructor() {}

  getFullAddress(bank: Bank) {
    bank.fullAddress = bank.address + ', ' + bank.city + ', ' + bank.zip + ', ' + bank.country;
  }

}
