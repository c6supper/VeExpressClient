import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {QLoginComponent} from './components/login/login.component';
import {QAuthComponent} from './components/auth/auth.component';
import {NbLogoutComponent} from '@nebular/auth';

const routes: Routes = [
	{
		path: '',
		component: QAuthComponent,
		children: [
			{
				path: '',
				component: QLoginComponent
			},
			{
				path: 'login',
				component: QLoginComponent
			},
			{
				path: 'logout',
				component: NbLogoutComponent
			}
		],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QAuthRoutingModule {
}
