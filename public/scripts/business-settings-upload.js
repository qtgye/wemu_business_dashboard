import Component from './component.js';

class BusinessSettingsUpload extends Component {

	constructor(element) {
		super(element);

		this.input = element.querySelector('input');
		this.previewImage = element.querySelector('.business-settings-upload__preview-image');
		this.previewRemove = element.querySelector('.business-settings-upload__preview-remove');
	}

	init() {
		this.input.addEventListener('change', () => this.handleChange());
		this.previewRemove.addEventListener('click', e => this.handlePreviewRemoveClick(e));
	}

	handleChange() {
		if ( this.input.files[0] ) {
			console.log('this.input.files[0]',this.input.files[0]);
			this.showFilePreview();
		}

		console.log('change');
	}

	handlePreviewRemoveClick(e) {
		e.preventDefault();
		this.removePreview();
	}

	showFilePreview() {
		var reader = new FileReader();

    reader.onload = (e) => {
    	this.previewImage.src = e.target.result;
    	this.element.classList.add('business-settings-upload--preview');
    }

    reader.readAsDataURL(this.input.files[0]);
	}

	removePreview() {
		this.input.value = '';
		this.element.classList.remove('business-settings-upload--preview');
	}
}

BusinessSettingsUpload.selector = '.business-settings-upload';

export default BusinessSettingsUpload;