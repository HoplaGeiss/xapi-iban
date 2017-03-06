import { XapiIbanPage } from './app.po';

describe('xapi-iban App', () => {
  let page: XapiIbanPage;

  beforeEach(() => {
    page = new XapiIbanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
