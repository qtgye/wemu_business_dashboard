import Component from './component.js';

const BASE_URL = `https://api.stripe.com`;

/**
 * Test token for Stripe's test data
 */
const TOKEN = `sk_test_ydejiTIEdldp2qecw6oQmryx`;

class BillingHistory extends Component {
	constructor(element) {
		super(element);
    this.customerId = element.dataset.customerId;
    this.table = element.querySelector('.table__table');
    this.saveTemplates();
	}

	async init() {
    const invoicesData = await this.fetchInvoices();
    this.renderInvoices(invoicesData);
	}

	saveTemplates() {
		this.rowTemplate = this.table.tBodies[0].firstElementChild.cloneNode(true);
	}

	async fetchInvoices() {
		const ENDPOINT = `${BASE_URL}/v1/invoices?customer=${this.customerId}`;
	  const response = await fetch(ENDPOINT, {
	    headers: {
	      Authorization: `Bearer ${TOKEN}`,
	    }
	  });
	  const { data } = await response.json();

	  return data;
	}

	renderInvoices(invoicesData) {
		const fragment = document.createDocumentFragment();
		const [ tableBody ] = this.table.tBodies

		// Loop through the invoices,
		// feeding into a copy of row template
		invoicesData.forEach(data => {
			const row = this.createInvoiceRow(data);
			fragment.appendChild(row);
		});

		tableBody.innerHTML = '';
		tableBody.appendChild(fragment);
	}

	createInvoiceRow(invoiceData) {
		const row = this.rowTemplate.cloneNode(true);
		const { created, amount_due, currency, status } = invoiceData;

		row.children[0].textContent = this.formatDate(created * 1000);
		row.children[1].textContent = this.formatCurrency(amount_due, currency);
		row.children[2].dataset.value = status === 'paid' ? 1 : false;

		return row;
	}

	formatDate(date) {
		const dateTime = moment(date);
		return dateTime.format('MMM D, YYYY');
	}

	formatCurrency(amount, currency) {
		switch(currency) {
			case 'usd':
				let [ whole, decimal ] = amount.toFixed(2).split('.');
				// Insert commas
				whole = whole.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
				return `$${whole}.${decimal}`;
		}
	}
}

BillingHistory.selector = '.billing-history';

export default BillingHistory;
