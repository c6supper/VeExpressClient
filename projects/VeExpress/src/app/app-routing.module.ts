import {NgModule} from '@angular/core';
import {ExtraOptions, Routes, RouterModule} from '@angular/router';
import {VeExpressNotFoundComponent} from './pages/miscellaneous/not-found/not-found.component';
import {VeExpressAuthGuard} from './auth-guard.service';


const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module')
			.then(m => m.VeExpressAuthModule)
	},
	{
		path: 'pages',
		canActivate: [VeExpressAuthGuard],
		loadChildren: () => import('./pages/pages.module')
			.then(m => m.VeExpressPagesModule),
	},
	{
		path: '', redirectTo: 'pages', pathMatch: 'full'
	},
	{
		path: '**', component: VeExpressNotFoundComponent
	}
];

const config: ExtraOptions = {
	useHash: false,
	enableTracing: false
};

@NgModule({
	imports: [
		RouterModule.forRoot(routes, config)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
