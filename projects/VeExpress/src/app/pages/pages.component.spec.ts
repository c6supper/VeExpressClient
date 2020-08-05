import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VeExpressPagesComponent} from './pages.component';

describe('VeExpressPagesComponent', () => {
	let component: VeExpressPagesComponent;
	let fixture: ComponentFixture<VeExpressPagesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [VeExpressPagesComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VeExpressPagesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
