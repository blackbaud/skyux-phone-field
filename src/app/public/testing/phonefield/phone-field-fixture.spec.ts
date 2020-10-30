import {
  fakeAsync,
  TestBed,
  ComponentFixture,
  tick
} from '@angular/core/testing';

import {
  Component
} from '@angular/core';

import {
  expect,
  SkyAppTestUtility
} from '@skyux-sdk/testing';

import {
  SkyPhoneFieldFixture
} from './phone-field-fixture';

import {
  SkyPhoneFieldTestingModule
} from './phone-field-testing.module';

const DATA_SKY_ID = 'test-phone-field';

//#region Test component
@Component({
  selector: 'phone-field-test',
  template: `
<form
  class='phone-field-demo'
  [formGroup]="phoneForm"
>
  <sky-phone-field
    data-sky-id="${DATA_SKY_ID}"
    [defaultCountry]="defaultCountry"
  >
    <input
      formControlName="phoneControl"
      skyPhoneFieldInput
    >
  </sky-phone-field>

  <sky-status-indicator *ngIf="!phoneControl.valid"
    descriptionType="none"
    indicatorType="danger"
  >
    Enter a phone number matching the format for the selected country.
  </sky-status-indicator>
</form>
`
})
class PhoneFieldTestComponent {
  public defaultCountry: string;
}
//#endregion Test component

describe('PhoneField fixture', () => {
  let fixture: ComponentFixture<PhoneFieldTestComponent>;
  let testComponent: PhoneFieldTestComponent;
  let popoverFixture: SkyPhoneFieldFixture;

  //#region helpers
  // function detectChangesFakeAsync(): void {
  //   fixture.detectChanges();
  //   tick();
  // }
  //#endregion

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhoneFieldTestComponent
      ],
      imports: [
        SkyPhoneFieldTestingModule
      ]
    });

    fixture = TestBed.createComponent(
      PhoneFieldTestComponent
    );
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    popoverFixture = new SkyPhoneFieldFixture(fixture);
  });

  it('should expose phone field default values', fakeAsync(async () => {
    // expect all values to be undefined since the popover element does not exist
    expect(popoverFixture.title).toBeUndefined();
    expect(popoverFixture.body).toBeUndefined();
    expect(popoverFixture.alignment).toBeUndefined();
    expect(popoverFixture.position).toBeUndefined();
  }));

  it('should expose phone field properties', fakeAsync(async () => {
    // give properties non-default values
    testComponent.defaultCountry = 'gb';
    fixture.detectChanges();

    // expect all values to be undefined since the popover element does not exist
    expect(popoverFixture.title).toEqual(testComponent.popoverTitle);
    expect(SkyAppTestUtility.getText(popoverFixture.body)).toEqual(testComponent.popoverBody);
    expect(popoverFixture.alignment).toEqual(testComponent.popoverAlignment);
    expect(popoverFixture.position).toEqual(testComponent.popoverPlacement);
  }));
});
