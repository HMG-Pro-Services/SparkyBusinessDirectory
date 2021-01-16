import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';

export class TemplateWarningWrapper {
	run(fc: FormlyConfig) {
		fc.templateManipulators.preWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.expressionProperties && field.expressionProperties['templateOptions.warn']) {
				return 'warning-wrapper';
			}
		});

		fc.templateManipulators.postWrapper.push((field: FormlyFieldConfig) => {
			if (field && field.expressionProperties && field.expressionProperties['templateOptions.warn']) {
				return 'warning-message';
			}
		});
	}
}