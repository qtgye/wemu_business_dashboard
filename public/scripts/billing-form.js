import Component from './component.js';
import debounce from './utils/debounce.js';

const BASE_URL = `https://api.stripe.com`;

const formFields = [
	'name',
	'card_number',
	'ccv',
	'card_expiration_month',
	'card_expiration_year',
];

/**
 * Test token for Stripe's test data
 */
const TOKEN = `sk_test_ydejiTIEdldp2qecw6oQmryx`;

class BillingForm extends Component {
	constructor(element) {
		super(element);
    this.customerId = element.dataset.customerId;
	}

	async init() {
		this.saveFields();
		await this.fetchCustomerCardData();
    this.populateFields();
    this.watchChanges();
	}

	saveFields() {
		// Save input fields
    this.fields = formFields.reduce((fields, fieldName) => {
			fields[fieldName] = this.element[fieldName];
			return fields;
    }, {});
	}

	async fetchCustomerCardData() {
		const ENDPOINT = `${BASE_URL}/v1/customers/${this.customerId}/sources?type=card`;
	  const response = await fetch(ENDPOINT, {
	    headers: {
	      Authorization: `Bearer ${TOKEN}`,
	    }
	  });
	  const { data } = await response.json();

	  this.card = data[0];
	}

	populateFields() {
		const cardData = this.extractCardData();

		// Populate data
		formFields.forEach(fieldName => {
			this.fields[fieldName].value = cardData[fieldName];
		});
	}

	// Given a raw stripe customer card data,
	// Extract out necessary card data, matching the field names
	extractCardData() {
		const { card } = this.card;

		return {
			name: card.name,
			card_number: `**** ${card.last4}`,
			ccv: '', // This data is not available from stripe data
			card_expiration_month: card.exp_month,
			card_expiration_year: card.exp_year,
		}
	}

	/**
	 * Saves form updates on fields update
	 * debounced to run only after 500ms on the last keystroke
	 */
	watchChanges() {
		this.element.addEventListener('input', debounce(() => {
			const formData = this.getFormData();
			const updatedCardData = this.formatFormData(formData);
			this.saveCardData(updatedCardData);
		}, 500));
	}

	getFormData() {
		const formData = new FormData(this.element);
		const formattedData = [...formData.entries()].reduce(( data, [ name, value ]) => {
			data[name] = value;
			return data;
		}, {});

		return formattedData;
	}

	// Given a form data, format into stripe-consumable format
	formatFormData(formData) {
		return {
			exp_month: formData.card_expiration_month,
			exp_year: formData.card_expiration_year,
			name: formData.name,
		};
	}

	async saveCardData(stripeCardData) {
		let serializedData = Object.entries(stripeCardData).map(([ name, value ]) => `card[${name}]=${value}`).join('&');

		// Add name as owner name.
		// for some reason, stripe doesnt use card[name] param to update the actual card in dashboard
		serializedData += `&owner[name]=${stripeCardData.name}`;

		const ENDPOINT = `${BASE_URL}/v1/customers/${this.customerId}/sources/${this.card.id}`;
	  const response = await fetch(ENDPOINT, {
	  	method: 'POST',
	    headers: {
	      Authorization: `Bearer ${TOKEN}`,
	      'Content-type': 'application/x-www-form-urlencoded',
	    },
	    body: encodeURI(serializedData),
	  });
	  const json = await response.json();

	  if ( json.error ) {
	  	alert(json.error.message);
	  } else {
			console.log('Card data saved!', json);
	  }
	}
}

BillingForm.selector = '.billing-form';

export default BillingForm;
