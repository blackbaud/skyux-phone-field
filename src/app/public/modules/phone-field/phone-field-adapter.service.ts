import {
  Injectable,
  Renderer2
} from '@angular/core';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

@Injectable()
export class SkyPhoneFieldAdapterService {

  constructor(
    private renderer: Renderer2,
    private resourcesService: SkyLibResourcesService
  ) { }

  public addElementClass(element: HTMLElement, className: string) {
    this.renderer.addClass(element, className);
  }

  public setElementDisabledState(element: HTMLElement, disabled: boolean) {
    this.renderer.setProperty(
      element,
      'disabled',
      disabled);
  }

  public setElementPlaceholder(element: HTMLElement, placeholder: string) {
    this.renderer.setAttribute(element, 'placeholder', placeholder);
  }

  public setElementValue(element: HTMLElement, value: string) {
    this.renderer.setProperty(
      element,
      'value',
      value ? value : ''
    );
  }

  public setAriaLabel(element: HTMLElement) {
    if (!element.getAttribute('aria-label')) {
      this.resourcesService.getString('skyux_phone_field_default_label')
        .subscribe((value: string) => {
          this.renderer.setAttribute(
            element,
            'aria-label',
            value
          );
        });
    }
  }

}
