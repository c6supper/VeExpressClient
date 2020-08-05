"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var pages_component_1 = require("./pages.component");
describe('PagesComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [pages_component_1.PagesComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(pages_component_1.PagesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=pages.component.spec.js.map