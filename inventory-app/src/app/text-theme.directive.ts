import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appTextTheme]'
})
export class TextThemeDirective {

  constructor(elRef: ElementRef) {
    elRef.nativeElement.style.color = '#00ADB5'; 
 }
}
