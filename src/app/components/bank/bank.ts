export class Bank {
  bic: string;
  branch: string;
  bank: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  fax: string;
  www: Boolean;
  country: string;
  countryIso: string;
  account: string;
  fullAddress: string;

  constructor(bank: any) {
    this.bic = bank.bic;
    this.branch = bank.branch;
    this.bank = bank.bank;
    this.address = bank.address;
    this.city = bank.city;
    this.state = bank.state;
    this.zip = bank.zip;
    this.phone = bank.phone;
    this.fax = bank.fax;
    this.www = bank.www;
    this.country = bank.country;
    this.countryIso = bank.countryIso;
    this.account = bank.account;
  }
}
