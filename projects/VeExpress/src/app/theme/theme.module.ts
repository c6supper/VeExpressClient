import {QThemeModule} from 'galaxy';
import {ModuleWithProviders, NgModule} from '@angular/core';

@NgModule({
	imports: [
		QThemeModule
	],
	exports: [
		QThemeModule
	]
})
export class VeExpressThemeModule extends QThemeModule {
	static forRoot(): ModuleWithProviders {
		return QThemeModule.forRoot() as ModuleWithProviders;
	}
}
