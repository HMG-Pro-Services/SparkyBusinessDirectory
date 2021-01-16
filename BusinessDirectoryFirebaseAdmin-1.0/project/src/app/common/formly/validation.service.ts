import { FormControl, FormGroup } from '@angular/forms';
import validator from 'validator';

export class ValidationService {
	static getValidatorErrorMessage(code: string) {
		let config = {
			required: 'Required',
			invalidEmailAddress: 'Invalid email address',
			invalidUrl: 'Invalid URL',
			prefixError: 'Fill slag and select year'
		};

		return config[code];
	}

	static prefixValidator(c: FormControl) {
		let invalid = !c.value || c.value.length < 5;
		return invalid ? { prefixError: true } : null;
	}

	static urlValidator(control) {
		if (!control.value) {
			return null;
		}

		if (validator.isURL(control.value)) {
			return null;
		} else {
			return { invalidUrl: true };
		}
	}

	static emailValidator(control) {
		if (!control.value) {
			return null;
		}

		if (validator.isEmail(control.value)) {
			return null;
		} else {
			return { invalidEmailAddress: true };
		}
	}

	static greaterOrEqualDate(form: FormGroup, field: string) {
		let fieldChanges = false;
		return function innerFunction(control) {
			if (!form.get(field)) {
				return null;
			}

			if (!fieldChanges) {
				form.get(field).valueChanges
					.subscribe(() => {
						control.updateValueAndValidity();
					});
				fieldChanges = true;
			}

			let thisDate = control.value;
			let otherDate = form.get(field).value;

			if (!thisDate || !otherDate) {
				return null;
			}

			if (thisDate.year > otherDate.year || thisDate.month > otherDate.month || thisDate.day >= otherDate.day) {
				return null;
			} else {
				return { not_matching: true };
			}
		};
	}
}
