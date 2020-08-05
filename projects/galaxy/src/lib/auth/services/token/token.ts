import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';

export class QAuthJWTToken extends NbAuthJWTToken {
	getUser() {
		return super.getPayload();
	}
}

