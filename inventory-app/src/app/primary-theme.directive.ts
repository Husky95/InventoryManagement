import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPrimaryTheme]'
})
export class PrimaryThemeDirective {

  constructor(elRef: ElementRef) {
    elRef.nativeElement.style.backgroundColor = '#A6B1E1'; 
 }

}
