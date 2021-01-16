import { Component } from '@angular/core';
import { Field } from '@ngx-formly/core';

@Component({
	selector: 'formly-field-html',
	template: `
		<div [innerHTML]="to['content']"></div>
	`,
})
export class FormlyFieldHtml extends Field {
}
