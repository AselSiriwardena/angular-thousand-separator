import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

/*
* * @Input numberInput - takes ngModel value.
* * @Input isReadyOnly - in case of make the input read only. ( default : false )
* * @Input inputLength - max length of the input field. ( default : 8 )
* * @Input numberFormatterParam - params for the number formatter. ( default : 1.0-5 )
* * @Input inlineStyle - custom inline styling can be passed { default : '' )
* * @Input styleClasses  - takes the style class to apply. ( default : reset-input-style w-100 text-right )
* * @Input placeholder - input field placeholder { default : '' )
*/

export class AppComponent implements OnInit, OnChanges {

	public get numberInput(): number {
		return this._numberInput;
	}

	@Input() public set numberInput(value: number) {
		this._numberInput = value;
		this.numberWithoutCommas = this._numberInput;
	}

	@Input() public isReadOnly: boolean;
	@Input() public isDisabled: boolean;
	@Input() public inputLength: any;
	@Input() public numberFormatterParam: any;
	@Input() public styleClasses: any;
	@Input() public inlineStyle: string;
	@Input() public placeholder: string;
	@Output() public numberInputChange = new EventEmitter();

	public _numberInput: number;
	private _styleClass: string;
	private _klassReadOnly: boolean;
	private _klassDisabled: boolean;
	private _klassInputLength: number;
	private _numberWithoutCommas: number;
	private _numberFormatParam: string;
	private _klassStyle: string;
	private _klassPlaceholder: string;

	public ngOnInit(): void {
		this.styleClass = this.styleClasses ? this.styleClasses : 'reset-input-style w-100 text-right';
		this.klassReadOnly = this.isReadOnly ? this.isReadOnly : false;
		this.klassDisabled = this.isDisabled ? this.isDisabled : false;
		this.klassInputLength = this.inputLength ?  this.inputLength : 8;
		this.numberFormatParam = this.numberFormatterParam ? this.numberFormatterParam : '1.0-5';
		this.klassStyle = this.inlineStyle ? this.inlineStyle : '';
		this.klassPlaceholder = this.placeholder ? this.placeholder : '';
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['isReadOnly'] && !changes['isReadOnly'].firstChange) {
			this.klassReadOnly = changes['isReadOnly'].currentValue;
		}
		if (changes['isDisabled'] && !changes['isDisabled'].firstChange) {
			this.klassDisabled = changes['isDisabled'].currentValue;
		}
	}

	public onInputChange(event: string): void {
		this.numberWithoutCommas = parseFloat(event.replace(/\,/g, '').concat(''));
		this.numberInputChange.emit(this.numberWithoutCommas);
	}

	public restrictNonNumeric(e: any): void {

		if (['Delete', 'Backspace', 'Tab', 'Escape', 'Enter', 'NumLock', 'ArrowLeft', 'ArrowRight', 'End', 'Home', '.'].indexOf(e.key) !== -1 ||
			// Allow: Ctrl+A
			(e.key === 'a' && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+C
			(e.key === 'c' && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+V
			(e.key === 'v' && (e.ctrlKey || e.metaKey)) ||
			// Allow: Ctrl+X
			(e.key === 'x' && (e.ctrlKey || e.metaKey))) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(e.key) === -1)) {
			e.preventDefault();
		}
	}

	public get styleClass(): any { return this._styleClass; }

	public set styleClass(value: any) { this._styleClass = value; }

	public get klassReadOnly(): boolean { return this._klassReadOnly; }

	public set klassReadOnly(value: boolean) { this._klassReadOnly = value; }

	public get numberWithoutCommas(): number { return this._numberWithoutCommas; }

	public set numberWithoutCommas(value: number) { this._numberWithoutCommas = value; }

	public get klassInputLength(): number { return this._klassInputLength; }

	public set klassInputLength(value: number) { this._klassInputLength = value; }

	public get numberFormatParam(): string { return this._numberFormatParam; }

	public set numberFormatParam(value: string) { this._numberFormatParam = value; }

	public get klassStyle(): string { return this._klassStyle; }

	public set klassStyle(value: string) { this._klassStyle = value; }

	public get klassPlaceholder(): string { return this._klassPlaceholder; }

	public set klassPlaceholder(value: string) { this._klassPlaceholder = value; }

	public get klassDisabled(): boolean { return this._klassDisabled; }

	public set klassDisabled(value: boolean) { this._klassDisabled = value; }
}
