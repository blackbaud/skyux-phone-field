import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter
} from '@angular/core';

require('intl-tel-input/build/js/utils');
require('intl-tel-input/build/js/intlTelInput');

declare var intlTelInputUtils: any;
declare var intlTelInputGlobals: any;

import {
  SkyCountryData
} from './types';

@Component({
  selector: 'sky-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyPhoneFieldComponent {

  public countryData: SkyCountryData[];

  public defaultCountryData: SkyCountryData;

  public disabled: boolean;

  public set selectedCountry(newCountry: SkyCountryData) {
    this._selectedCountry = newCountry;

    if (!this._selectedCountry.placeholder) {
      this._selectedCountry.placeholder = intlTelInputUtils.getExampleNumber(
        newCountry.iso2,
        true,
        intlTelInputUtils.numberType.FIXED_LINE
      );
    }

    this.countryData.splice(this.countryData.indexOf(newCountry), 1);

    let sortedNewCountries = this.countryData
      .sort((a, b) => {
        if ((a === this.defaultCountryData || a.name < b.name) && b !== this.defaultCountryData) {
          return -1;
        } else {
          return 1;
        }
      });

    sortedNewCountries.splice(0, 0, newCountry);
    this.countryData = sortedNewCountries;
    this.selectedCountryChanged.emit(newCountry);
  }

  public get selectedCountry() {
    return this._selectedCountry;
  }

  public selectedCountryChanged = new EventEmitter<SkyCountryData>();

  private _selectedCountry: SkyCountryData;

  constructor() {
    /**
     * The "slice" here ensures that we get a copy of the array and not the global original. This
     * ensures that multiple instances of the component don't overwrite the original data.
     */
    this.countryData = intlTelInputGlobals.getCountryData().slice(0);
    this.selectedCountry = this.countryData[0];
  }

  /**
   * Format's the given phone number based on the currently selected country.
   * @param phoneNumber The number to format
   */
  public formatNumber(phoneNumber: string): string {
    return intlTelInputUtils.formatNumber(
      phoneNumber,
      this.selectedCountry.iso2,
      intlTelInputUtils.numberFormat.NATIONAL
    );
  }

  /**
   * Sets the country to validate against based on the county's iso2 code.
   * @param countryCode The International Organization for Standardization's two-letter code
   * for the default country.
   */
  public selectCountry(countryCode: string): void {
    this.selectedCountry = this.countryData.find(countryInfo => countryInfo.iso2 === countryCode);
  }

  /**
   * Sets the default country for the phone field component based on the county's iso2 code.
   * @param countryCode The International Organization for Standardization's two-letter code
   * for the default country.
   */
  public setDefaultCountry(countryCode: string): void {
    this.defaultCountryData = this.countryData.find(country => country.iso2 === countryCode);
  }

  /**
   * Validate's the given phone number based on the currently selected country.
   * @param phoneNumber The number to validate
   */
  public validateNumber(phoneNumber: string): boolean {
    return intlTelInputUtils.isValidNumber(phoneNumber, this.selectedCountry.iso2);
  }

}
