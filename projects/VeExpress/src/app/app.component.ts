import {Component} from '@angular/core';
import {QTranslateService} from 'galaxy';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	title = 'VeExpress';
	constructor(private translate: QTranslateService) {
		translate.setDefaultLang('en');
	}
}
