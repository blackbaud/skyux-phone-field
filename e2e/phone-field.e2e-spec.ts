import {
  expect,
  SkyHostBrowser,
  SkyVisualThemeSelector
} from '@skyux-sdk/e2e';

import {
  by,
  element
} from 'protractor';

describe('Phone Field', () => {
  let currentTheme: string;
  let currentThemeMode: string;

  async function selectTheme(theme: string, mode: string): Promise<void> {
    currentTheme = theme;
    currentThemeMode = mode;

    return SkyVisualThemeSelector.selectTheme(theme, mode);
  }

  function getScreenshotName(name: string): string {
    if (currentTheme) {
      name += '-' + currentTheme;
    }

    if (currentThemeMode) {
      name += '-' + currentThemeMode;
    }

    return name;
  }

  function runTests() {
    it('should match previous phone field screenshot', (done) => {
      expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field')
      });
    });

    it('should match previous phone field screenshot (screen: xs)', async (done) => {
      await SkyHostBrowser.setWindowBreakpoint('xs');

      expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field-xs')
      });
    });

    it('should match previous phone field screenshot when touched', async (done) => {
      await element(by.css('#screenshot-phone-field .sky-form-control')).click();

      expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field-touched')
      });
    });

    it('should match previous phone field screenshot when invalid', async (done) => {
      let inputElement = element(by.css('#screenshot-phone-field .sky-form-control'));

      await inputElement.click();
      await inputElement.sendKeys('1234');

      await element(by.css('body')).click();

      expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field-invalid')
      });
    });

    it('should match previous phone field screenshot when dropdown is open', async (done) => {
      const countrySearchBtn = element(by.css(
        '#screenshot-phone-field .sky-phone-field-country-btn .sky-btn-default'
      ));

      await countrySearchBtn.click();

      const inputElement = element(by.css('#screenshot-phone-field textarea.sky-form-control'));

      await inputElement.click();
      await inputElement.sendKeys('arg');

      await SkyHostBrowser.moveCursorOffScreen();

      expect('#screenshot-phone-field').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field-country-search')
      });
    });

    it('should match previous phone field screenshot with a default country', (done) => {
      expect('#screenshot-phone-field-default').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field-default')
      });
    });

    it(
      'should match previous phone field screenshot with a default country (screen: xs)',
        async (done) => {
        await SkyHostBrowser.setWindowBreakpoint('xs');

        expect('#screenshot-phone-field-default').toMatchBaselineScreenshot(done, {
          screenshotName: getScreenshotName('phone-field-default-xs')
        });
      }
    );

    it('should match previous phone field screenshot inside input box', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-phone-field-input-box');

      expect('#screenshot-phone-field-input-box').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field-input-box')
      });
    });

    it('should match previous phone field screenshot when in country search mode when inside input box', async (done) => {
      await SkyHostBrowser.scrollTo('#screenshot-phone-field-input-box');
      const countrySearchBtn = element(by.css(
        '#screenshot-phone-field-input-box .sky-phone-field-country-btn .sky-btn-default'
      ));

      await countrySearchBtn.click();

      await SkyHostBrowser.moveCursorOffScreen();

      expect('#screenshot-phone-field-input-box').toMatchBaselineScreenshot(done, {
        screenshotName: getScreenshotName('phone-field-country-search-input-box')
      });
    });
  }

  beforeEach(async () => {
    currentTheme = undefined;
    currentThemeMode = undefined;

    await SkyHostBrowser.get('visual/phone-field');
    await SkyHostBrowser.setWindowBreakpoint('lg');
  });

  runTests();

  describe('when modern theme', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'light');
    });

    runTests();
  });

  describe('when modern theme in dark mode', () => {
    beforeEach(async () => {
      await selectTheme('modern', 'dark');
    });

    runTests();
  });

});
