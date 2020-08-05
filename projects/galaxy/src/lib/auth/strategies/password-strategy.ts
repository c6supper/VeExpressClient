import {Injectable} from '@angular/core';
import {Observable, of as observableOf} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {NbAuthStrategyClass} from '@nebular/auth';
import {NbPasswordAuthStrategyOptions} from '@nebular/auth';
import {NbPasswordAuthStrategy} from '@nebular/auth';
import {NbAuthResult} from '@nebular/auth';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class QAuthStrategy extends NbPasswordAuthStrategy {

	static setup(options: NbPasswordAuthStrategyOptions): [NbAuthStrategyClass, NbPasswordAuthStrategyOptions] {
		return [QAuthStrategy, options];
	}

	authenticate(data?: any): Observable<NbAuthResult> {
		const module = 'login';
		const method = this.getOption(`${module}.method`);
		const url = this.getActionEndpoint(module);
		const requireValidToken = this.getOption(`${module}.requireValidToken`);

		const headers = new HttpHeaders({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let body = 'grant_type=password&username=';
		if (data.username && data.password) {
			body += data.username + '&password=' + data.password;
		}
		return this.http.request(method, url, {headers, body, observe: 'response'})
			.pipe(
				map((res) => {
					if (this.getOption(`${module}.alwaysFail`)) {
						throw this.createFailResponse(data);
					}
					return res;
				}),
				map((res) => {
					return new NbAuthResult(
						true,
						res,
						this.getOption(`${module}.redirect.success`),
						[],
						this.getOption('messages.getter')(module, res, this.options),
						this.createToken(this.getOption('token.getter')(module, res, this.options), requireValidToken));
				}),
				catchError((res) => {
					return this.handleResponseError(res, module);
				}),
			);
	}
}
