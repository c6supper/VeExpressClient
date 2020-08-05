import {QRoleProvider} from 'galaxy';
import {QAuthService} from 'galaxy';
import {Observable} from 'rxjs';
import {QAuthJWTToken} from 'galaxy';
import {map} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class VeExpressRoleProvider extends QRoleProvider {

    constructor(private authService: QAuthService) {
        super();
    }

    getRole(): Observable<string | string[]> {
        return this.authService.onTokenChange()
        .pipe(
            map((token: QAuthJWTToken) => {
                return token.isValid() ? token.getPayload().role : 'Viewer';
            }),
        );
    }
}
