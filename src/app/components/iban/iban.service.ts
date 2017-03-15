import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Bank } from '../bank/bank';
import { IbanValidation } from '../iban-validation/iban-validation';
import { Iban } from './iban';

@Injectable()
export class IbanService {
  // let iban;

  constructor(private http: Http) {}

  search(iban: String): Promise<any> {
    // const url =  'http://192.168.1.229:8080/iban';
    const url =  'api/banks';
    return this.http
      // .get(`${url}?iban=${iban}`)
      .get(`${url}/1`)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  private extractData(response: Response) {
    const validations = response.json().data.validations as IbanValidation[];
    const bank = response.json().data.bank_data as Bank;

    return new Iban(bank, validations);
  }
}
