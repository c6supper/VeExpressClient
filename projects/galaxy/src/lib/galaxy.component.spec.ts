import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VeexGuiComponent} from './galaxy.component';

describe('VeexGuiComponent', () => {
	let component: VeexGuiComponent;
	let fixture: ComponentFixture<VeexGuiComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [VeexGuiComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VeexGuiComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
