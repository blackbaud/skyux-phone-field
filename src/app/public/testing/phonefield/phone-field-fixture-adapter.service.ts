import {
  Injectable,
  Renderer2
} from '@angular/core';

/**
 * Service for interacting with the DOM elements of the phone field fixture.
 * @internal
 */
@Injectable()
export class SkyPhoneFieldFixtureAdapterService {

  constructor(
    private renderer: Renderer2
  ) { }

  public setSkyTestId(element: HTMLElement, skyTestId: string): void {
    this.renderer.setAttribute(element, 'data-sky-id', skyTestId);
  }
}
