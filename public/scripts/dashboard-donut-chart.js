import Component from './component.js';

class DashboardDonutChart extends Component {
	constructor(element) {
		super(element);

		this.chartContainer = this.element.querySelector('.dashboard-donut-chart__chart');
	}

	async init() {
		this.showLoading();
		const data = await this.getData();
		this.initializeChart(data);
		this.hideLoading();
	}

	/**
	 * Get data
	 * This should be updated to fetch the actual data from the API
	 */
	async getData() {
		return {
			negative: {
				y: 15,
			},
			positive: {
				y: 35,
			},
		}
	}

	initializeChart(data) {
		const _this = this;
		const emptyPointData = {
			name: 'Empty',
			y: 100,
			color: 'gray',
		};

		const seriesData = Object.entries(data).map(([ category, data ]) => {
			emptyPointData.y -= data.y;

			return {
				category,
				y: data.y,
			}
		});

		// Append empty point
		seriesData.push(emptyPointData);

		console.log('seriesData',seriesData);

		this.chart = Highcharts.chart(this.chartContainer, {
			title: {
				text: '',
			},
			chart: {
				type: 'pie',
				styledMode: true,
			},
			tooltip: {
				useHTML: true,
				formatter() { return _this.tooltipFormatter(this) },
				positioner: () => this.tooltipPositioner(),
			},
			xAxis: {
				type: 'category',
				labels: {
					useHTML: true,
					formatter: ({ value }) => this.xAxisFormatter(value),
				}
			},
			yAxis: {
				title: {
					text: '',
				},
				labels: {
					useHTML: true,
					format: '${value}',
				},
			},
			plotOptions: {
				pie: {
					states: {
						hover: {
							halo: {
								size: 10,
							}
						}
					}
				}
			},
			series: [
				// Empty series as backgound
				{
					data: [{ y: 100 }],
					size: '170',
					innerSize: '150',
					tooltip: { enabled: false },
					enableMouseTracking: false,
				},
				// Actual data
				{
					data: seriesData,
					size: '180px',
	        innerSize: '140px',
	        enableMouseTracking: false,
				},
				// Actual data, but for hover only
				{
					data: seriesData,
					size: '200px',
	        innerSize: '120px',
				}
			],
		});
	}

	tooltipFormatter({ y }) {
		return `<div class="dashboard-donut-chart__tooltip">${y}%</div>`;
	}

	tooltipPositioner() {
		return { x: 0, y: 0 };
	}

	showLoading() {
		this.element.classList.add('dashboard-donut-chart--loading');
	}

	hideLoading() {
		this.element.classList.remove('dashboard-donut-chart--loading');
	}
}

DashboardDonutChart.selector = '.dashboard-donut-chart';

export default DashboardDonutChart;