import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  public mgtFeeFromValue: any;

public onInputChange(event: string , id: any): any {

        switch (id) {
            case 'mgtFeeFromValue': {
                this.mgtFeeFromValue = this.changeText(event);
                console.log(this.mgtFeeFromValue);
                break;
            }

            default: {
              console.log('Shit happens');
                break;
            }
        }
    }


  public changeText(str: string): number {
		return parseFloat(str.replace(/\D/g, '').concat(' '));
	}

  public restrictNonNumeric(e: any): void {

		const key   = e.keyCode ? e.keyCode : e.which;

		if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
				(key === 65 && (e.ctrlKey || e.metaKey)) ||
				(key >= 35 && key <= 40) ||
				(key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
				(key >= 96 && key <= 105)
			)) { e.preventDefault(); }
	}
}
