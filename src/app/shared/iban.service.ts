import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IbanService {

  constructor(private http: Http) {}

  search(iban: String): Promise<any> {
    const url =  'http://api.xapi.com/iban';
    return this.http
      .get(`${url}&search=${iban}`)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
