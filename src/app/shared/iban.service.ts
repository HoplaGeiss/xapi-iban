import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class IbanService {

  constructor(private http: Http) {}

  search(iban: String): Observable<any> {
    const url =  'http://api.xapi.com/iban';
    return this.http
      .get(`${url}&search=${iban}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.json().response !== null && res.json().response !== undefined) {
      return res.json();
    }
  }

  private handleError (error: Response | any) {
    return Observable.throw(new Error());
  }
}
