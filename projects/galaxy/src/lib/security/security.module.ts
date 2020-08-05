import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {NgModule} from '@angular/core';


@NgModule({
    imports: [NbSecurityModule],
    exports: [NbSecurityModule],
})

export class QSecurityModule extends NbSecurityModule {

    static roleProvider(provider) {
        return {provide: NbRoleProvider, useClass: provider};
    }
}
