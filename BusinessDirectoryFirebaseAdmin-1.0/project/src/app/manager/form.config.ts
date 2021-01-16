import { Validators } from '@angular/forms';
import { ValidationService } from '../common/formly/validation.service';

export const itemsFormConfig = () => ({
	products: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Τitle',
				description: 'Provide the official product title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'price',
			templateOptions: {
				label: 'Price',
				type: 'number'
			}
		},
		{
			type: 'multi-select',
			key: 'business',
			templateOptions: {
				multiple: false,
				label: 'Business',
				labelProp: 'title',
				valueProp: '$key',
				collection: 'businesses'
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter the product descripiton',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumbnail',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Product pictures',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				maxFiles: 20,
				description: 'Recommended: 750 px wide x 500 px high'
			}
		},
		{
			type: 'input',
			key: 'url',
			templateOptions: {
				label: 'URL',
				description: 'Enter the page where this product is published.',
				placeholder: 'https://demo.morethanthemes.com/retailplus/commerce-default/node/12',
				required: true
			},
			validators: {
				validation: ValidationService.urlValidator
			},
			validation: {
				messages: {
					invalidUrl: ValidationService.getValidatorErrorMessage('invalidUrl')
				}
			}
		}
	],
	categories: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Category',
				description: 'Enter the category name.',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		}
	],
	businesses: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Name',
				description: 'Enter the business name.',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'file-upload',
			key: 'logo',
			templateOptions: {
				label: 'Logo',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Business pictures',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				maxFiles: 20
			}
		},
		{
			key: 'description',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter the business description',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'multi-select',
			key: 'category',
			templateOptions: {
				description: 'Select the business category.',
				multiple: false,
				label: 'Category',
				labelProp: 'title',
				valueProp: '$key',
				collection: 'categories'
			}
		},
		{
			type: 'input',
			key: 'phoneNumber',
			templateOptions: {
				label: 'Phone Number',
				description: 'Enter the business phone number.',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'input',
			key: 'email',
			templateOptions: {
				label: 'Email',
				description: 'Enter the business email adderss',
				required: true
			},
			validators: {
				validation: ValidationService.emailValidator
			},
			validation: {
				messages: {
					invalidEmailAddress: ValidationService.getValidatorErrorMessage('invalidEmailAddress')
				}
			}
		},
		{
			key: 'officeLocation',
			fieldGroup: [
				{
					type: 'coords',
					key: 'annotation',
					templateOptions: {
						label: 'Headquarters',
						longitude: 34.4,
						latitude: 35.455,
						description: 'Enter the business headquarters location'
					}
				}
			]
		},
		{
			type: 'input',
			key: 'facebookPage',
			templateOptions: {
				label: 'Facebook Page',
				description: 'Enter the business Facebook Page',
				placeholder: 'https://www.facebook.com/ionicframework',
				required: true
			},
			validators: {
				validation: ValidationService.urlValidator
			},
			validation: {
				messages: {
					invalidUrl: ValidationService.getValidatorErrorMessage('invalidUrl')
				}
			}
		},
		{
			type: 'input',
			key: 'wordpress',
			templateOptions: {
				label: 'WordPress Website JSON Data',
				description: 'Enter the business WordPress website data in JSON format',
				placeholder: 'https://demo.titaniumtemplates.com/wordpress/?json=1',
				required: true
			},
			validators: {
				validation: ValidationService.urlValidator
			},
			validation: {
				messages: {
					invalidUrl: ValidationService.getValidatorErrorMessage('invalidUrl')
				}
			}
		},
		{
			type: 'input',
			key: 'drupal',
			templateOptions: {
				label: 'Drupal Website JSON Data',
				description: 'Enter the business Drupal website data in JSON format',
				placeholder: 'https://demo.titaniumtemplates.com/drupal/rest/views/rest_api',
				required: true
			},
			validators: {
				validation: ValidationService.urlValidator
			},
			validation: {
				messages: {
					invalidUrl: ValidationService.getValidatorErrorMessage('invalidUrl')
				}
			}
		},
		{
			type: 'open-hours',
			key: 'openhours',
			templateOptions: {
				label: 'Open hours'
			}
		},
		{
			key: 'mapdata',
			fieldGroup: [
				{
					type: 'coords',
					key: 'annotations',
					templateOptions: {
						label: 'Stores and Branches',
						longitude: 34.4,
						latitude: 35.455
					}
				}
			]
		}
	],
	catalogs: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				description: 'Enter the catalog title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter the product description',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'multi-select',
			key: 'business',
			templateOptions: {
				multiple: false,
				label: 'Business',
				labelProp: 'title',
				valueProp: '$key',
				collection: 'businesses'
			}
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumbnail',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'input',
			key: 'url',
			templateOptions: {
				label: 'URL',
				description: 'Enter the page where this catalog is published.',
				placeholder: 'https://issuu.com/dibiaggiony/docs/katalog',
				required: true
			},
			validators: {
				validation: ValidationService.urlValidator
			},
			validation: {
				messages: {
					invalidUrl: ValidationService.getValidatorErrorMessage('invalidUrl')
				}
			}
		},
		{
			type: 'input',
			key: 'pdf',
			templateOptions: {
				label: 'PDF',
				description: 'Enter the URL to the online PDF file of this catalog.',
				placeholder: 'https://skounis.s3.amazonaws.com/mobile-apps/business-directory/assets/pdf/catalog-2.pdf',
				required: true
			},
			validators: {
				validation: ValidationService.urlValidator
			},
			validation: {
				messages: {
					invalidUrl: ValidationService.getValidatorErrorMessage('invalidUrl')
				}
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Catalog pictures',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				maxFiles: 20

			}
		}
	],
	news: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'multi-select',
			key: 'business',
			templateOptions: {
				multiple: false,
				label: 'Business',
				labelProp: 'title',
				valueProp: '$key',
				collection: 'businesses'
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter the article body'
			}
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumbnail',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'file-upload',
			key: 'picture',
			templateOptions: {
				label: 'Picture',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				description: 'Recommended: 750 px wide x 500 px high'
			}
		}
	],
	services: [
		{
			type: 'input',
			key: 'title',
			templateOptions: {
				label: 'Τitle',
				description: 'Provide the service title',
				required: true
			},
			validators: {
				validation: Validators.compose([Validators.required])
			}
		},
		{
			type: 'multi-select',
			key: 'business',
			templateOptions: {
				multiple: false,
				label: 'Business',
				labelProp: 'title',
				valueProp: '$key',
				collection: 'businesses'
			}
		},
		{
			key: 'body',
			type: 'textarea',
			templateOptions: {
				rows: 5,
				label: 'Description',
				description: 'Please enter the service description'
			}
		},
		{
			type: 'file-upload',
			key: 'thumb',
			templateOptions: {
				label: 'Thumbnail',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				description: 'Recommended: 300 px wide x 300 px high'
			}
		},
		{
			type: 'file-upload',
			key: 'pictures',
			templateOptions: {
				label: 'Service pictures',
				storage: 'FIRE',
				disabled: true,
				buttonLabel: 'Upload',
				maxFiles: 20,
				description: 'Recommended: 750 px wide x 500 px high'
			}
		},
		{
			type: 'input',
			key: 'url',
			templateOptions: {
				label: 'URL',
				description: 'Enter the page where this service is published.',
				placeholder: 'https://demo.morethanthemes.com/retailplus/commerce-default/node/12',
				required: true
			},
			validators: {
				validation: ValidationService.urlValidator
			},
			validation: {
				messages: {
					invalidUrl: ValidationService.getValidatorErrorMessage('invalidUrl')
				}
			}
		}
	]
});
