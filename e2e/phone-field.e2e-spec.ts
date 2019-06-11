import {
  expect,
  SkyHostBrowser
} from '@skyux-sdk/e2e';

import {
  by,
  element
} from 'protractor';

describe('Phone Field', () => {

  it('should match previous phone field screenshot', (done) => {
    SkyHostBrowser.get('visual/phone-field');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
      screenshotName: 'phone-field'
    });
  });

  it('should match previous phone field screenshot (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/phone-field');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
      screenshotName: 'phone-field-xs'
    });
  });

  it('should match previous phone field screenshot when touched', (done) => {
    SkyHostBrowser.get('visual/phone-field');
    SkyHostBrowser.setWindowBreakpoint('lg');
    element(by.css('#screenshot-phone-field .sky-form-control')).click();
    expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
      screenshotName: 'phone-field-touched'
    });
  });

  it('should match previous phone field screenshot when invalid', (done) => {
    SkyHostBrowser.get('visual/phone-field');
    SkyHostBrowser.setWindowBreakpoint('lg');
    let inputElement = element(by.css('#screenshot-phone-field .sky-form-control'));
    inputElement.click();
    inputElement.sendKeys('1234');
    element(by.css('body')).click();
    expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
      screenshotName: 'phone-field-invalid'
    });
  });

  it('should match previous phone field screenshot when dropdown is open', (done) => {
    SkyHostBrowser.get('visual/phone-field');
    SkyHostBrowser.setWindowBreakpoint('lg');
    let countrySearchBtn = element(by.css('#screenshot-phone-field .sky-phone-field-country-btn .sky-btn-default'));
    countrySearchBtn.click();
    SkyHostBrowser.moveCursorOffScreen();
    expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
      screenshotName: 'phone-field-country-search'
    });
  });

  it('should match previous phone field screenshot with a default country', (done) => {
    SkyHostBrowser.get('visual/phone-field');
    SkyHostBrowser.setWindowBreakpoint('lg');
    expect('#screenshot-phone-field-default').toMatchBaselineScreenshot(done, {
      screenshotName: 'phone-field-default'
    });
  });

  it('should match previous phone field screenshot with a default country (screen: xs)', (done) => {
    SkyHostBrowser.get('visual/phone-field');
    SkyHostBrowser.setWindowBreakpoint('xs');
    expect('#screenshot-phone-field-default').toMatchBaselineScreenshot(done, {
      screenshotName: 'phone-field-default-xs'
    });
  });
});
