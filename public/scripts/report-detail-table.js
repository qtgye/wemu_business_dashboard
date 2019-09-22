import Component from './component.js';

class ReportDetailTable extends Component {
	constructor(element) {
		super(element);

		this.csvLink = element.querySelector('.report-detail-table__csv-link');
		this.table = element.querySelector('table');
	}

	init() {
		this.generateCSVlink();
	}

	getTableData() {
		const [...tableRows] = this.table.tBodies[0].children;

		const rows = tableRows.map(({ children }) => {
			return [...children].reduce((rowData, cell) => {
				const { prop, value } = cell.dataset;
				rowData[prop] = value;
				return rowData;
			}, {});
		});

		const headers = Object.keys(rows[0]);

		return { headers, rows };
	}

	generateCSVlink() {
		const { headers, rows } = this.getTableData();
		const csvLines = [ headers.join(",") ];

		// Append rows data
		csvLines.push(...rows.map(row => Object.values(row).map(cellValue => `"${cellValue}"`).join(',')));

		this.csvLink.href = `data:text/csv;${csvLines.join('\n')}`;
	}
}

ReportDetailTable.selector = '.report-detail-table';

export default ReportDetailTable;