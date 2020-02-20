import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';

import {
  SkyAppWindowRef
} from '@skyux/core';

import {
  SkyAutocompleteInputDirective,
  SkyAutocompleteSelectionChange
} from '@skyux/lookup';

import 'intl-tel-input';

import {
  fromEvent,
  Subject
} from 'rxjs';

import {
  SkyCountrySelectCountry
} from './types';

@Component({
  selector: 'sky-country-field',
  templateUrl: './country-field.component.html',
  styleUrls: ['./country-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCountryFieldComponent implements OnDestroy, OnInit {

  @Input()
  public set defaultCountry(value: string) {
    if (value !== this._defaultCountry) {
      this._defaultCountry = value.toLowerCase();

      this.defaultCountryData = this.countries
        .find(country => country.iso2 === this._defaultCountry);

      if (!this.selectedCountry) {
        this.selectedCountry = this.defaultCountryData;
      }

      this.sortCountriesWithSelectedAndDefault(this.selectedCountry);
    }
  }

  public get defaultCountry(): string {
    return this._defaultCountry;
  }

  @Output()
  public selectedCountryChange = new EventEmitter<SkyCountrySelectCountry>();

  public countries: SkyCountrySelectCountry[];

  public countrySearchForm: FormGroup;

  public isInputFocused = false;

  @ViewChild(SkyAutocompleteInputDirective)
  public countrySearchAutocompleteDirective: SkyAutocompleteInputDirective;

  public set selectedCountry(newCountry: SkyCountrySelectCountry) {
    if (newCountry && this._selectedCountry !== newCountry) {
      this._selectedCountry = newCountry;

      this.sortCountriesWithSelectedAndDefault(newCountry);
      this.countrySearchForm.get('countrySearch').setValue(this.selectedCountry);

      this.selectedCountryChange.emit(newCountry);
    }
  }

  public get selectedCountry(): SkyCountrySelectCountry {
    return this._selectedCountry;
  }

  private defaultCountryData: SkyCountrySelectCountry;

  private idle = new Subject();

  private _defaultCountry: string;

  private _selectedCountry: SkyCountrySelectCountry;

  constructor(
    private formBuilder: FormBuilder,
    private windowRef: SkyAppWindowRef,
    private changeDetector: ChangeDetectorRef,
    private elRef: ElementRef
  ) {
    /**
     * The json functions here ensures that we get a copy of the array and not the global original.
     * This ensures that multiple instances of the component don't overwrite the original data.
     *
     * We must type the window object as any here as the intl-tel-input library adds its object
     * to the main window object.
     */
    this.countries = JSON.parse(JSON.stringify((window as any)
      .intlTelInputGlobals.getCountryData()));
    this.defaultCountryData = this.countries.find(country => country.iso2 === 'us');

    this.countrySearchForm = this.formBuilder.group({
      countrySearch: new FormControl()
    });
  }

  public ngOnInit(): void {
    if (!this.defaultCountry) {
      this.defaultCountry = 'us';
    }

    this.countrySearchForm.get('countrySearch').valueChanges.subscribe(newValue => {
      if (newValue) {
        this.selectedCountry = newValue;
      }
    });
    this.addEventListeners();
  }

  public ngOnDestroy(): void {
    this.selectedCountryChange.complete();
    this.removeEventListeners();
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
    }
  }

  private addEventListeners() {
    this.idle = new Subject();

    const documentObj = this.windowRef.nativeWindow.document;
    fromEvent(documentObj, 'mousedown').takeUntil(this.idle)
      .subscribe((event: MouseEvent) => {
        this.isInputFocused = this.elRef.nativeElement.contains(event.target);
        this.changeDetector.markForCheck();
      });

    fromEvent(documentObj, 'focusin')
      .takeUntil(this.idle)
      .subscribe((event: KeyboardEvent) => {
        this.isInputFocused = this.elRef.nativeElement.contains(event.target);
        this.changeDetector.markForCheck();
      });
  }

  private removeEventListeners() {
    this.idle.next();
    this.idle.complete();
  }

  private sortCountriesWithSelectedAndDefault(selectedCountry: SkyCountrySelectCountry): void {
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
