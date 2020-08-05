import {Component, Input, OnInit} from '@angular/core';
import {QMenuItem} from '../../menu/menu.service';

@Component({
	selector: 'card-menu',
	styleUrls: ['./card-menu.component.scss'],
	templateUrl: './card-menu.component.html',
})
export class QCardMenuComponent implements OnInit {
	/**
	 * List of menu items.
	 * @type List<QMenuItem> | List<any> | any
	 */
	@Input() components: QMenuItem[];

	constructor() {
	}

	ngOnInit() {
		// this.components = this.menu
		//     .getPreparedMenu('/docs')
		//     .find(({ title }) => title === 'Components')
		//     .children
		//     .slice(1)
		//     .map(({ data: { name, icon, type }, link }) => ({ name, icon, link, group: type === 'group' }));
	}
}
