import {
  DebugElement
} from '@angular/core';

import {
  ComponentFixture
} from '@angular/core/testing';

import {
  By
} from '@angular/platform-browser';

import {
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  SkyCountryFieldFixture
} from '@skyux/lookup/testing';

/**
 * Provides information for and interaction with a SKY UX phone field component.
 * By using the fixture API, a test insulates itself against updates to the internals
 * of a component, such as changing its DOM structure.
 */
export class SkyPhoneFieldFixture {
  private _debugEl: DebugElement;

  // this property is lazy loaded and should be accessed via the private countryFixture property
  private _countryFixture: SkyCountryFieldFixture;

  constructor(
    private fixture: ComponentFixture<any>,
    private skyTestId: string
  ) {
    this._debugEl = SkyAppTestUtility
      .getDebugElementByTestId(fixture, skyTestId, 'sky-phone-field');

    // The country selector needs extra time to initialize.
    // Consumers shouldn't need to work around this so we do an extra detect here
    fixture.detectChanges();
  }

  /**
   * The value of the input field for the phone field.
   */
  public get inputText(): string {
    return this.phoneFieldInput.value;
  }

  /**
   * Sets the value of the input field for the phone field.
   */
  public async setInputText(inputText: string): Promise<any> {
    const inputEl = this.phoneFieldInput;
    inputEl.value = inputText;

    SkyAppTestUtility.fireDomEvent(inputEl, 'input');
    this.fixture.detectChanges();

    SkyAppTestUtility.fireDomEvent(inputEl, 'change');

    this.fixture.detectChanges();
    return this.fixture.whenStable();
  }

  /**
   * Opens the country selector, peforms a search, but makes no selection.
   * @param searchText The name of the country to select.
   */
  public async searchCountry(searchText: string): Promise<NodeListOf<HTMLElement>> {
    await this.openCountrySelection();

    const countryFixture = await this.getCountryFixture();
    const results = await countryFixture.search(searchText);

    await this.waitForCountrySelection();
    return results;
  }

  /**
   * Opens the country selector, performs a search, and selects the first result (if any).
   * @param searchText The name of the country to select.
   */
  public async selectCountry(searchText: string): Promise<any> {
    await this.openCountrySelection();

    const countryFixture = await this.getCountryFixture();
    await countryFixture.searchAndSelectFirstResult(searchText);

    return this.waitForCountrySelection();
  }

  //#region helpers

  private get countryElement(): HTMLInputElement {
    return this._debugEl.query(By.css('sky-country-field')).nativeElement;
  }

  private get countryFlagButton(): HTMLInputElement {
    return this._debugEl.query(By.css('.sky-phone-field-country-btn .sky-btn')).nativeElement;
  }

  private get phoneFieldInput(): HTMLInputElement {
    return this._debugEl.query(By.css('input[skyPhoneFieldInput]')).nativeElement;
  }

  private async getCountryFixture(): Promise<SkyCountryFieldFixture> {
    if (this._countryFixture === undefined) {
      // tag the country field with a sky test id
      const countrySkyTestId = `${this.skyTestId}-country`;
      this.setSkyTestId(this.countryElement, countrySkyTestId);

      // initialize the country fixture
      this._countryFixture = new SkyCountryFieldFixture(this.fixture, countrySkyTestId);

      this.fixture.detectChanges();
      await this.fixture.whenStable();
    }

    return this._countryFixture;
  }

  private async openCountrySelection(): Promise<any> {
    this.countryFlagButton.click();
    return this.waitForCountrySelection();
  }

  private setSkyTestId(element: HTMLElement, skyTestId: string) {
    element.setAttribute('data-sky-id', skyTestId);
  }

  private async waitForCountrySelection(): Promise<any> {
    // any country selection needs extra time to complete
    this.fixture.detectChanges();
    await this.fixture.whenStable();

    this.fixture.detectChanges();
    return this.fixture.whenStable();
  }

  //#endregion
}
