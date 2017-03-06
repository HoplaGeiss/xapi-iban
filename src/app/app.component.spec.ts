import { ComponentFixture, TestBed } from '@angular/core/testing';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import {} from 'jasmine';

import { IbanService } from './shared/iban.service';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let comp;
  let page;
  let ibanService;

  // TODO import AppModule
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpModule
       ],
      declarations: [
        AppComponent,
      ],
      providers: [
        IbanService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    createComponent();
  }));


  function createComponent() {
    fixture = TestBed.createComponent(AppComponent);
    ibanService = fixture.debugElement.injector.get(IbanService);
    comp = fixture.componentInstance;
    page = new Page();

    // 1st change detection triggers ngOnInit which gets a hero
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      // 2nd change detection displays the async-fetched hero
      fixture.detectChanges();
      page.addPageElements();
    });
  }

  ////

  it('should show a bank after search', fakeAsync(() => {
    fixture.detectChanges(); // Initial state

    // Change the input
    page.ibanInput.value = 'GB23';
    // TODO find out why Event is not recognized
    page.ibanInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Click the submit button
    // TODO Create a testing helper for click
    page.submitButton.click();
    tick();

    // Expect the service has been called
    expect(page.ibanServiceSpy).toHaveBeenCalledWith('GB23');
  }));


  class Page {
    ibanServiceSpy: jasmine.Spy;
    ibanInput: DebugElement;
    submitButton: DebugElement;
    bank = 'Milton Keynes';

    constructor() {
      this.ibanServiceSpy = spyOn(ibanService, 'search');
    }

    /** Add page elements after hero arrives */
    addPageElements() {
      this.ibanInput = fixture.debugElement.query(By.css('input')).nativeElement;
      this.submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    }
  }
});
