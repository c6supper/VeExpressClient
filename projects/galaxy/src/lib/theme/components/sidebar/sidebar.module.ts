import {NbSidebarModule} from '@nebular/theme';
import {NgModule} from '@angular/core';


@NgModule({
	imports: [NbSidebarModule],
	exports: [NbSidebarModule]
})

export class QSidebarModule extends NbSidebarModule {

}
