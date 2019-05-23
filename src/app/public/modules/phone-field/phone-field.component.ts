import {
  animate,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  style,
  transition,
  trigger,
  ViewChild
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  SkyAutocompleteInputDirective,
  SkyAutocompleteSelectionChange
} from '@skyux/lookup';

import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil
} from 'google-libphonenumber';

import 'intl-tel-input';

import {
  Observable
} from 'rxjs/Observable';

import {
  Subscription
} from 'rxjs/Subscription';

import {
  SkyPhoneFieldCountry
} from './types';

/**
 * NOTE: The no-op animation is here in order to block the input's "fade in" animation
 * from firing on initial load. For more information on this technique you can see
 * https://www.bennadel.com/blog/3417-using-no-op-transitions-to-prevent-animation-during-the-initial-render-of-ngfor-in-angular-5-2-6.htm
 */
@Component({
  selector: 'sky-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('initalLoad', [
      transition(':enter', [])
    ]),
    trigger(
      'countrySearchAnimation', [
        transition(':enter', [
          style({
            opacity: 0,
            width: 0
          }),
          animate('200ms ease-in', style({
            opacity: 1,
            width: '*'
          }))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({
            opacity: 0,
            width: 0
          }))
        ])
      ]
    ),
    trigger(
      'phoneInputAnimation', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate('150ms ease-in', style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          animate('150ms ease-in', style({
            opacity: 0
          }))
        ])
      ]
    )
  ]
})
export class SkyPhoneFieldComponent implements OnDestroy, OnInit {

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
  public phoneInputShown = true;

  @ViewChild('countrySearchInput')
  public countrySearchInput: ElementRef;

  @ViewChild(SkyAutocompleteInputDirective)
  public countrySearchAutocompleteDirective: SkyAutocompleteInputDirective;

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

  public countrySearchForm: FormGroup;

  private _defaultCountry: string;

  private _selectedCountry: SkyPhoneFieldCountry;

  constructor(
    private formBuilder: FormBuilder
  ) {
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

    this.countrySearchForm = this.formBuilder.group({
      countrySearch: new FormControl(this.selectedCountry)
    });
  }

  public ngOnInit(): void {
    if (!this.defaultCountry) {
      this.defaultCountry = 'us';
    } else {
      this.selectedCountry = this.defaultCountryData;
    }

    let blurSubscription: Subscription;

    this.countrySearchForm.get('countrySearch').valueChanges.subscribe(newValue => {
      if (newValue) {
        this.selectedCountry = newValue;

        /**
         * Sanity check. The blur event should fire before any new value is set based on a click.
         * However, this is here to ensure this behavior.
         */
        if (blurSubscription) {
          blurSubscription.unsubscribe();
        }
      } else {
        blurSubscription = Observable
          .fromEvent(this.countrySearchInput.nativeElement, 'blur')
          .take(1)
          .subscribe(() => {
            this.countrySearchForm.get('countrySearch').setValue(this.selectedCountry);
          });
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
    if (showSearch) {
      this.phoneInputShown = false;
    } else {
      this.countrySearchShown = false;
    }
  }

  public countrySearchAnimationEnd() {
    if (!this.countrySearchShown) {
      this.phoneInputShown = true;
    } else {
      this.countrySearchInput.nativeElement.focus();
      this.countrySearchInput.nativeElement.select();
      this.countrySearchAutocompleteDirective.textChanges.emit({ value: this.selectedCountry.name });
    }
  }

  public phoneInputAnimationEnd() {
    if (!this.phoneInputShown) {
      this.countrySearchShown = true;
    }
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
