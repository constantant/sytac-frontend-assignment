import { Component, ElementRef, forwardRef, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: [ './select.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  private static _id = 0;

  id: string;
  currentValue: string;
  isDisabled: boolean;

  @Input()
  label: string;

  @Input()
  values: string[];

  @ViewChild('select')
  select: ElementRef;


  private _onChange = (value: string) => {
  }

  private _onTouched = (value: string) => {
  }

  constructor(private _renderer: Renderer2) {
    this.id = `app-select-${++SelectComponent._id}`;
  }

  onSelect(value: string) {
    this.currentValue = value;
    this._onChange(value);
    this._onTouched(value);
  }

  writeValue(value: string): void {
    this.currentValue = value;
    this._renderer.setProperty(this.select.nativeElement, 'value', value);
  }

  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this.select.nativeElement, 'disabled', isDisabled);
    this.isDisabled = isDisabled;
  }

}
