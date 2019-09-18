import Component from './component.js';
import Modal from './modal.js';

class Businesses extends Component {
	constructor(element) {
		super(element);
    this.addModalButton = this.element.querySelector('.listing-header__add');
	}

	init() {
    this.initializeModal();
	}

  initializeModal() {
    const modal = this.element.querySelector('.modal');
    this.modal = new Modal(modal);
    this.modal.init();

    this.addModalButton.addEventListener('click', e => this.handleAddClick(e));
  }

  handleAddClick(e) {
    e.preventDefault();
    this.modal.show();
  }

}

Businesses.selector = '.businesses-listing';

export default Businesses;
