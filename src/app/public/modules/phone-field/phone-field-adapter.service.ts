import {
  Injectable,
  Renderer2
} from '@angular/core';

@Injectable()
export class SkyPhoneFieldAdapterService {

  constructor(
    private renderer: Renderer2
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

}
