import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const banks = [
      {
        id: 1,
        bank_data: {
          bic: 'BARCGB22',
          branch: 'INTERNATIONAL BANKING 2',
          bank: 'BARCLAYS BANK PLC',
          address: 'PO Box 69999 1 Churchill Place Canary Wharf',
          city: 'London',
          state: null,
          zip: 'E14 1QE',
          phone: '020 71147000',
          fax: null,
          www: null,
          email: null,
          country: 'United Kingdom',
          country_iso: 'GB',
          account: '73160944'
        },
        validations: [
          {
            code: '002',
            message: 'Account Number check digit is correct'
          },
          {
            code: '001',
            message: 'IBAN Check digit is correct'
          },
          {
            code: '205',
            message: 'IBAN structure is not correct'
          },
          {
            code: '003',
            message: 'IBAN Length is correct'
          }
        ]

      }
    ];

    return {banks};
  }
}
