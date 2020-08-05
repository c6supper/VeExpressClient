import {NbInputModule} from '@nebular/theme';
import {NgModule} from '@angular/core';


@NgModule({
    imports: [NbInputModule],
    exports: [NbInputModule]
})

export class QInputModule extends NbInputModule {
}
