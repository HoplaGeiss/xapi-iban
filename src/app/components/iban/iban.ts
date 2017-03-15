import { IbanValidation } from '../iban-validation/iban-validation';
import { Bank } from '../bank/bank';

export class Iban {
  validations: IbanValidation[];
  bank: Bank;

  constructor(bank: Bank, validations: IbanValidation[]) {
    this.validations = validations;
    this.bank = bank;
  }
}
