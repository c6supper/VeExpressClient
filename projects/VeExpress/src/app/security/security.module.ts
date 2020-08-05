import {ModuleWithProviders, NgModule} from '@angular/core';
import {QSecurityModule} from 'galaxy';
import {VeExpressRoleProvider} from './service/role.provider';

@NgModule({
    imports: [QSecurityModule],
    exports: [QSecurityModule]
})

export class VeExpressSecurityModule extends QSecurityModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: VeExpressSecurityModule,
            providers: [
                super.forRoot({
                    accessControl: {
                        Viewer: {
                            view: '*', // todo,resource should be declared, license/testset/user/org etc.
                        },
                        Manager: {
                            parent: 'Viewer',
                            create: '*',
                            edit: '*',
                            remove: '*',
                        },
                        Distributor: {
                            parent: 'Manager'
                        },
                        FAE: {
                            parent: 'Distributor'
                        },
                        Administrator: {
                            parent: 'FAE'
                        }
                    },
                }).providers,
                super.roleProvider(VeExpressRoleProvider)
            ]
        } as ModuleWithProviders;
    }
}


