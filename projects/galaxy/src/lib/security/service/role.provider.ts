import {of as observableOf, Observable} from 'rxjs';
import {NbRoleProvider} from '@nebular/security';

export class QRoleProvider implements NbRoleProvider {
	getRole(): Observable<string | string[]> {
		return observableOf('Viewer');
	}
}
