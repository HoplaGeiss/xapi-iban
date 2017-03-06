import { ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { IbanService } from './iban.service';
import {} from 'jasmine';

const apiResult = {
  response: {
    bank: 'Milton Keynes'
  }
};


describe('IbanService', () => {
  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      {provide: ConnectionBackend, useClass: MockBackend},
      {provide: RequestOptions, useClass: BaseRequestOptions},
      Http,
      IbanService
    ]);
    this.ibanService = this.injector.get(IbanService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('search() should call the backend at the correct URL', () => {
    this.ibanService.search('GB12');
    expect(this.lastConnection).toBeDefined('no http service connection at all?');
    expect(this.lastConnection.request.url).toEqual('http://api.xapi.com/iban&search=GB12');
  });

  it('search() should return a bank if the IBAN exists', fakeAsync(() => {
    let result: any;
    this.ibanService.search('GB12').subscribe(bank => result = bank);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(apiResult),
    })));
    tick();
    expect(result).toEqual('Milton Keynes');
  }));

  it('search() should return false if the IBAN doesn\'t exist', fakeAsync(() => {
    let result: any;
    this.ibanService.search('0000').subscribe(bank => result = bank);
    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify(apiResult),
    })));
    tick();
    expect(result).toEqual(false);
  }));
});
