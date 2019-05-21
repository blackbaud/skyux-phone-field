import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Input,
  QueryList,
  ViewChildren,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import {
  SkyAutocompleteSelectionChange
} from '@skyux/lookup';

import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil
} from 'google-libphonenumber';

import 'intl-tel-input';

import {
  SkyPhoneFieldCountry
} from './types';

@Component({
  selector: 'sky-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyPhoneFieldComponent implements OnDestroy, OnInit, AfterViewInit {

  @Input()
  public set defaultCountry(value: string) {
    if (value !== this._defaultCountry) {
      this._defaultCountry = value;

      this.defaultCountryData = this.countries.find(country => country.iso2 === value);
      this.sortCountriesWithSelectedAndDefault(this.selectedCountry);
    }
  }

  public get defaultCountry(): string {
    return this._defaultCountry;
  }

  @Output()
  public selectedCountryChange = new EventEmitter<SkyPhoneFieldCountry>();

  public countries: SkyPhoneFieldCountry[];

  public countrySelectDisabled = false;

  public countrySearchShown = false;

  @ViewChildren('countrySearchInput')
  public countrySearchInput: QueryList<ElementRef>;

  public set selectedCountry(newCountry: SkyPhoneFieldCountry) {
    if (newCountry && this._selectedCountry !== newCountry) {
      this._selectedCountry = newCountry;

      if (!this._selectedCountry.exampleNumber) {
        const numberObj = this.phoneUtils.getExampleNumberForType(newCountry.iso2,
          PhoneNumberType.FIXED_LINE);
        this._selectedCountry.exampleNumber = this.phoneUtils.format(numberObj,
          PhoneNumberFormat.NATIONAL);
      }

      this.sortCountriesWithSelectedAndDefault(newCountry);

      this.selectedCountryChange.emit(newCountry);
    }
  }

  public get selectedCountry(): SkyPhoneFieldCountry {
    return this._selectedCountry;
  }

  private defaultCountryData: SkyPhoneFieldCountry;

  private phoneUtils = PhoneNumberUtil.getInstance();

  private _defaultCountry: string;

  private _selectedCountry: SkyPhoneFieldCountry;

  constructor() {
    /**
     * The "slice" here ensures that we get a copy of the array and not the global original. This
     * ensures that multiple instances of the component don't overwrite the original data.
     *
     * We must type the window object as any here as the intl-tel-input library adds its object
     * to the main window object.
     */
    this.countries = (window as any).intlTelInputGlobals.getCountryData().slice(0);
    this.defaultCountryData = this.countries.find(country => country.iso2 === 'us');
    this.selectedCountry = this.defaultCountryData;
  }

  public ngOnInit(): void {
    if (!this.defaultCountry) {
      this.defaultCountry = 'us';
    } else {
      this.selectedCountry = this.defaultCountryData;
    }
  }

  public ngAfterViewInit(): void {
    this.countrySearchInput.changes.subscribe(input => {
      if (input.length > 0) {
        input.first.nativeElement.focus();
      }
    });
  }

  public ngOnDestroy(): void {
    this.selectedCountryChange.complete();
  }

  /**
   * Sets the country to validate against based on the county's iso2 code.
   * @param countryCode The International Organization for Standardization's two-letter code
   * for the default country.
   */
  public onCountrySelected(newCountry: SkyAutocompleteSelectionChange): void {
    if (newCountry.selectedItem) {
      this.selectedCountry = this.countries.find(countryInfo => countryInfo.iso2 ===
        newCountry.selectedItem.iso2);
      this.toggleCountrySearch(false);
    }
  }

  public toggleCountrySearch(showSearch: boolean): void {
    this.countrySearchShown = showSearch;
  }

  private sortCountriesWithSelectedAndDefault(selectedCountry: SkyPhoneFieldCountry): void {
    this.countries.splice(this.countries.indexOf(selectedCountry), 1);

      let sortedNewCountries = this.countries
        .sort((a, b) => {
          if ((a === this.defaultCountryData || a.name < b.name) && b !== this.defaultCountryData) {
            return -1;
          } else {
            return 1;
          }
        });

      sortedNewCountries.splice(0, 0, selectedCountry);
      this.countries = sortedNewCountries;
  }

}
