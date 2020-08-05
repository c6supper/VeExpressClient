import {QAuthModule} from 'galaxy';
import {QAuthStrategy} from 'galaxy';
import {QAuthJWTToken} from 'galaxy';
import {ModuleWithProviders, NgModule} from '@angular/core';

const formSetting: any = {
	redirectDelay: 0,
	strategy: 'veexpress-auth',
	showMessages: {
		success: true,
		error: true
	},
};

const authOptions: any = {
	strategies: [
		QAuthStrategy.setup({
			name: 'veexpress-auth',
			baseEndpoint: '',
			login: {
				endpoint: '/token',
				method: 'post',
				redirect: {
					success: '/pages',
					failure: null
				}
			},
			logout: {
				endpoint: '',
				redirect: {
					success: '/auth/login',
					failure: '/auth/login',
				},
			},
			token: {
				class: QAuthJWTToken,
				key: 'access_token', // this parameter tells where to look for the token
			},
			validation: {
				fullName: {
					required: true,
					minLength: 5,
					regexp: '*'
				}
			}
		}),
	],
	forms: {
		login: formSetting,
		register: formSetting,
		requestPassword: formSetting,
		resetPassword: formSetting,
		logout: {
			redirectDelay: 500,
			strategy: 'veexpress-auth'
		}
	}
};

@NgModule({
	imports: [QAuthModule],
	exports: [QAuthModule]
})

export class VeExpressAuthModule extends QAuthModule {
	static forRoot(): ModuleWithProviders {
		return super.forRoot(authOptions) as ModuleWithProviders;
	}
}


