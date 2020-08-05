import {NgModule} from '@angular/core';
import {NbActionsModule} from '@nebular/theme'

@NgModule({
    imports: [NbActionsModule],
    exports: [NbActionsModule]
})

export class QActionsModule extends NbActionsModule {
}