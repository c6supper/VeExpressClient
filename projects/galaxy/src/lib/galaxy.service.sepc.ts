import {TestBed} from '@angular/core/testing';

import {VeexGuiService} from './galaxy.service';

describe('VeexGuiService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: VeexGuiService = TestBed.get(VeexGuiService);
		expect(service).toBeTruthy();
	});
});
