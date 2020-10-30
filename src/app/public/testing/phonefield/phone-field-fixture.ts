import {
  DebugElement
} from '@angular/core';

import {
  ComponentFixture
} from '@angular/core/testing';

import {
  SkyAppTestUtility
} from '@skyux-sdk/testing';

/**
 * Provides information for and interaction with a SKY UX popover component.
 * By using the fixture API, a test insulates itself against updates to the internals
 * of a component, such as changing its DOM structure.
 */
export class SkyPhoneFieldFixture {
  private debugEl: DebugElement;

  constructor(
    private fixture: ComponentFixture<any>,
    skyTestId: string
  ) {
    this.debugEl = SkyAppTestUtility.getDebugElementByTestId(fixture, skyTestId, 'sky-phone-field');
  }

  /**
   * Returns information about the dropdown component.
   */
  public get dropdown(): string {
    return this.debugEl;
  }

  // clickCountrySelectButton
  //

  //#region helpers
  // private get contentElement(): HTMLElement {
  //   return this.queryOverlay('sky-popover-content');
  // }
  //#endregion
}
