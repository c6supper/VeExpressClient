import {Component} from '@angular/core';
import {QNotFoundComponent} from 'galaxy';
import {Router} from '@angular/router';

const childComponentOptions = Object.assign(
	{},
	{template: (QNotFoundComponent as any).__annotations__[0].template},
	{selector: 'veexpress-not-found'},
	{styles: (QNotFoundComponent as any).__annotations__[0].styles}
);

@Component(childComponentOptions)
export class VeExpressNotFoundComponent extends QNotFoundComponent {

	constructor(private router: Router) {
		super();
	}

	goToHome() {
		this.router.navigate(['/']);
	}
}
