import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef } from '@angular/core';

@Component({
  selector: 'app-select',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectStubComponent),
      multi: true
    }
  ]
})
export class SelectStubComponent implements ControlValueAccessor {
  writeValue(value: string): void {
  }

  registerOnChange(fn: () => void): void {
  }

  registerOnTouched(fn: () => void): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }
}
