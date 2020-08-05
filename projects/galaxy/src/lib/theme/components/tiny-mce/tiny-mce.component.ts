import {Component, OnDestroy, AfterViewInit, Output, EventEmitter, ElementRef} from '@angular/core';
import {LocationStrategy} from '@angular/common';

@Component({
	selector: 'galaxy-tiny-mce',
	template: '',
})

export class TinyMCEComponent implements OnDestroy, AfterViewInit {

	@Output() editorKeyup = new EventEmitter<any>();

	editor: any;
	// todo should be global variable
	private tinymce: any;

	constructor(
		private host: ElementRef,
		private locationStrategy: LocationStrategy,
	) {
	}

	ngAfterViewInit() {
		this.tinymce.init({
			target: this.host.nativeElement,
			plugins: ['link', 'paste', 'table'],
			skin_url: `${this.locationStrategy.getBaseHref()}assets/skins/lightgray`,
			setup: editor => {
				this.editor = editor;
				editor.on('keyup', () => {
					this.editorKeyup.emit(editor.getContent());
				});
			},
			height: '320',
		});
	}

	ngOnDestroy() {
		this.tinymce.remove(this.editor);
	}
}
