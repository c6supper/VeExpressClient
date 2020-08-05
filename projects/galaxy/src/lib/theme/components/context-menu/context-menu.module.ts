import {NbContextMenuModule} from '@nebular/theme';
import {NgModule} from '@angular/core';


@NgModule({
	imports: [NbContextMenuModule],
	exports: [NbContextMenuModule]
})

export class QContextMenuModule extends NbContextMenuModule {

}
