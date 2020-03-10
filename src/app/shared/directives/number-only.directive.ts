import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {
  @Input('decimals') decimals: number = 0;
  private specialKeys = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Delete', 'Comma' ];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if ( (next && !this.check(next, this.decimals))) {
      event.preventDefault();
    }
  }

  private check(value: string, decimals: number) {
    if (decimals <= 0) {
      return String(value).match(new RegExp(/^\d+$/));
    } else {
        const regExpString = '^\\s*((\\d+(\\.\\d{0,' + decimals + '})?)|((\\d*(\\.\\d{1,' + decimals + '}))))\\s*$';
        return String(value).match(new RegExp(regExpString));
    }
  }

}
