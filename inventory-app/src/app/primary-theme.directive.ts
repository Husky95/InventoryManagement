import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPrimaryTheme]'
})
export class PrimaryThemeDirective {

  constructor(elRef: ElementRef) {
    elRef.nativeElement.style.backgroundColor = '#222831'; 
 }

}
