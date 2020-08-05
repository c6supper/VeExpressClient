import {ModuleWithProviders, NgModule} from '@angular/core';
import {NbDialogModule} from '@nebular/theme';
import {QDialogService} from './dialog.service';
import {QDialogComponent} from './dialog.component';

@NgModule({
    imports: [NbDialogModule],
    exports: [NbDialogModule],
    declarations: [QDialogComponent]
})

export class QDialogModule extends NbDialogModule {
    static forChild(): ModuleWithProviders<QDialogModule> {
        return {
            ngModule: QDialogModule,
            providers: [
                NbDialogModule.forChild().providers,
                QDialogService,
            ],
        };
    }
}
