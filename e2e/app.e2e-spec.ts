import { FirebaseDatabasePage } from './app.po';

describe('firebase-database App', () => {
  let page: FirebaseDatabasePage;

  beforeEach(() => {
    page = new FirebaseDatabasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
