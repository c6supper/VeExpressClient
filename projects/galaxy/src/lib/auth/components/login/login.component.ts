import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {QAuthService} from '../../services/auth.service';
import {QTokenService} from '../../services/token/token.service';

@Component({
	templateUrl: './login.component.html'
})
export class QLoginComponent extends NbLoginComponent implements OnInit {
	constructor(private tokenService: QTokenService,
	            service: QAuthService,
	            @Inject(NB_AUTH_OPTIONS) options = {},
	            cd: ChangeDetectorRef,
	            router: Router) {
		super(service, options, cd, router);
	}

	ngOnInit(): void {
		// this.tokenService.clear();
	}
}
