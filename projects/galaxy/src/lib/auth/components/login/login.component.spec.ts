import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {QLoginComponent} from './login.component';

describe('LoginComponent', () => {
	let component: QLoginComponent;
	let fixture: ComponentFixture<QLoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [QLoginComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QLoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
