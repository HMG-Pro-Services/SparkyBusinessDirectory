export class CKEditorConfig {
	static limitedToolbar = {
		allowedContent: true,
		entities: false,
		height: 90,
		toolbar: [
			{
				name: 'basicstyles',
				groups: ['basicstyles', 'cleanup'],
				items: ['Bold', 'Italic', 'Underline', 'Subscript', 'Superscript', 'RemoveFormat']
			},
			{
				name: 'clipboard',
				groups: ['clipboard', 'undo'],
				items: ['Undo', 'Redo']
			},
			{
				name: 'document',
				groups: ['document'],
				items: ['Source']
			}
		]
	};

	static extendedToolbar = {
		allowedContent: true,
		entities: false,
		toolbar: [
			{
				name: 'clipboard',
				groups: ['clipboard', 'undo'],
				items: ['Undo', 'Redo']
			},
			{
				name: 'styles',
				groups: ['styles'],
				items: ['Format']
			},
			{
				name: 'basicstyles',
				groups: ['basicstyles', 'cleanup'],
				items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat']
			},
			{
				name: 'links',
				groups: ['links'],
				items: ['Link', 'Unlink']
			},
			{
				name: 'paragraph',
				groups: ['paragraph'],
				items: ['NumberedList', 'BulletedList', '-', 'Blockquote']
			},
			{
				name: 'indent',
				groups: ['indent'],
				items: ['Indent', 'Outdent']
			},
			{
				name: 'insert',
				groups: ['insert'],
				items: ['Image', 'EmbedSemantic', 'Table']
			},
			{
				name: 'tools',
				groups: ['tools'],
				items: ['Maximize']
			},
			{
				name: 'others',
				groups: ['others'],
				items: ['MediaEmbed']
			},
			{
				name: 'document',
				groups: ['document'],
				items: ['Source']
			}
		]
	};
}
