import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule, MatSelectModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigOption, FormlyModule } from '@ngx-formly/core';
import { ManipulatorOption, TypeOption, WrapperOption } from '@ngx-formly/core/lib/services/formly.config';
import { CKEditorModule } from 'ng2-ckeditor';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SharedModule } from '../shared.module';
import { TemplateWarningWrapper } from './run/warning';
import { FormlyFieldCheck } from './types/check';
import { FormlyFieldCoords } from './types/coordinates/coords';
import { EditCoordsDialog } from './types/coordinates/edit-coords.dialog';
import { FormlyFieldDatePicker } from './types/date-picker';
import { FormlyFieldDateTimePicker } from './types/date-time-picker';
import { FormlyFieldHtml } from './types/html';
import { FormlyFieldMultiCheckbox } from './types/multi-checkbox';
import { FormlyFieldMultiSelect } from './types/multi-select';
import { EditHoursDialog } from './types/open-hours/edit-hours.dialog';
import { FormlyFieldOpenHours } from './types/open-hours/open-hours';
import { FormlyFieldReference } from './types/reference/reference';
import { FormlyFieldRepeater } from './types/repeater';
import { CKEditorDialog } from './types/rich-text-editor/ckeditor.dialog';
import { FormlyFieldRichText } from './types/rich-text-editor/rich-text';
import { FormlyFieldTimePicker } from './types/time-picker';
import { FormlyFieldFileUpload } from './types/upload/file-upload';
import { FormlyPanelWrapper } from './wrappers/panel';
import { FormlyWrapperWarning, FormlyWrapperWarningMessage } from './wrappers/warning';

const types: TypeOption[] = [
	{
		name: 'date-time-picker',
		component: FormlyFieldDateTimePicker,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'date-picker',
		component: FormlyFieldDatePicker,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'time-picker',
		component: FormlyFieldTimePicker,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'file-upload',
		component: FormlyFieldFileUpload,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'rich-text',
		component: FormlyFieldRichText,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'html',
		component: FormlyFieldHtml
	},
	{
		name: 'check',
		component: FormlyFieldCheck
	},
	{
		name: 'multi-select',
		component: FormlyFieldMultiSelect,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'multi-checkbox',
		component: FormlyFieldMultiCheckbox,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'coords',
		component: FormlyFieldCoords,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'open-hours',
		component: FormlyFieldOpenHours,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'reference',
		component: FormlyFieldReference,
		wrappers: ['fieldset', 'label']
	},
	{
		name: 'repeater',
		component: FormlyFieldRepeater
	}
];

const manipulators: ManipulatorOption[] = [
	{ class: TemplateWarningWrapper, method: 'run' }
];

const wrappers: WrapperOption[] = [
	{ name: 'warning-wrapper', component: FormlyWrapperWarning },
	{ name: 'warning-message', component: FormlyWrapperWarningMessage },
	{ name: 'panel', component: FormlyPanelWrapper }
];

export const ngFormlyConfig: ConfigOption = {
	types: types,
	manipulators: manipulators,
	wrappers: wrappers
};

@NgModule({
	imports: [
		FormlyModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		NgbModule,
		CKEditorModule,
		MatSelectModule,
		AgmCoreModule,
		SharedModule,
		CalendarModule,
		MatProgressSpinnerModule
	],
	exports: [],
	declarations: [
		FormlyFieldRepeater,
		FormlyFieldTimePicker,
		FormlyFieldDatePicker,
		FormlyFieldDateTimePicker,
		FormlyFieldFileUpload,
		FormlyFieldRichText,
		FormlyFieldCheck,
		FormlyFieldHtml,
		FormlyWrapperWarning,
		FormlyWrapperWarningMessage,
		CKEditorDialog,
		EditCoordsDialog,
		FormlyFieldMultiSelect,
		FormlyFieldCoords,
		FormlyFieldOpenHours,
		EditHoursDialog,
		FormlyPanelWrapper,
		FormlyFieldReference,
		FormlyFieldMultiCheckbox
	],
	entryComponents: [CKEditorDialog, EditCoordsDialog, EditHoursDialog],
	providers: []
})
export class CustomFormlyModule {
}
