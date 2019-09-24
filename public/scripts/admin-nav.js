import Component from './component.js';

class AdminNav extends Component {
	constructor(element) {
		super(element);
    this.toggle = this.element.querySelector('.admin-nav__toggle');
	}

	init() {
    this.initializeToggle();
	}

	initializeToggle() {
		this.toggle.addEventListener('click', e => this.onToggleClick(e));
	}

	onToggleClick(e) {
		e.preventDefault();

		if ( this.element.classList.contains('admin-nav--expanded') ) {
			this.element.classList.remove('admin-nav--expanded')
		} else {
			this.element.classList.add('admin-nav--expanded')
		}
	}
}

AdminNav.selector = '.admin-nav';

export default AdminNav;
