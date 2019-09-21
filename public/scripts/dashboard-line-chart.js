import Component from './component.js';

class DashboardLineChart extends Component {
	constructor(element) {
		super(element);

		this.chartContainer = this.element.querySelector('.dashboard-line-chart__chart');
		this.customSelect = this.element.parentElement.parentElement.querySelector('.custom-select');

		// Initial interval in number of days
		// 1 | 7 | 30
		this.interval = 1;
	}

	async init() {
		this.showLoading();
		this.initializeChart();
		this.bindCustomSelect();

		const data = await this.getOneDayData();
		this.updateChartData(data);
	}

	/**
	 * Get 1 day data
	 * This should be updated to fetch the actual data from the API
	 */
	async getOneDayData() {
		// Generates random no. from 0 to 10 to mock hourly sales amount
		const randomSales = () => Math.random() * (1 - .1) + .1;

		// Mock hourly data from 6am to 9pm
		return Array.from({ length: 15 }).reduce((hourlyData, item, index) => {
			const adjustedHour = index + 6;
			const hourFormat = adjustedHour < 10 ? `0${adjustedHour}` : adjustedHour;
			const datetime = `2019-01-18 ${hourFormat}:00:00`;
			const amount = (hourlyData.slice(-1)[0] || { amount: randomSales() }).amount + randomSales();
			hourlyData.push({ datetime, amount });

			return hourlyData;
		}, []);
	}

	/**
	 * Get 7 days data
	 * This should be updated to fetch the actual data from the API
	 */
	async getSevenDaysData() {
		// Generates random no. from 0 to 10 to mock hourly sales amount
		const randomSales = () => Math.random() * (10 - 3) + 3;

		// Mock hourly data from 6am to 9pm
		return Array.from({ length: 7 }).reduce((dailyData, item, index) => {
			const adjustedDay = index + 1;
			const dayFormat = adjustedDay < 1 ? `0${adjustedDay}` : adjustedDay;
			const datetime = `2019-01-${dayFormat} 08:00:00`;
			const amount = (dailyData.slice(-1)[0] || { amount: randomSales() }).amount + randomSales();
			dailyData.push({ datetime, amount });

			return dailyData;
		}, []);
	}

	/**
	 * Get 30 days data
	 * This should be updated to fetch the actual data from the API
	 */
	async getThirtyDaysData() {
		// Generates random no. from 0 to 10 to mock hourly sales amount
		const randomSales = () => Math.random() * (10 - 3) + 3 ;

		// Mock hourly data from 6am to 9pm
		return Array.from({ length: 30 }).reduce((dailyData, item, index) => {
			const adjustedDay = index + 1;
			const dayFormat = adjustedDay < 10 ? `0${adjustedDay}` : adjustedDay;
			const datetime = `2019-01-${dayFormat} 08:00:00`;
			const amount = (dailyData.slice(-1)[0] || { amount: randomSales() }).amount + randomSales();
			dailyData.push({ datetime, amount });

			return dailyData;
		}, []);
	}

	initializeChart(initialData) {
		const _this = this;

		this.chart = Highcharts.chart(this.chartContainer, {
			title: {
				text: '',
			},
			chart: {
				type: 'area',
				styledMode: true,
			},
			tooltip: {
				useHTML: true,
				formatter() { return _this.tooltipFormatter(this) },
			},
			defs: {
				gradient0: {
		        tagName: 'linearGradient',
		        id: 'line-chart-gradient',
		        x1: 0,
		        y1: 0,
		        x2: 0,
		        y2: 1,
		        children: [{
		            tagName: 'stop',
		            offset: 0
		        }, {
		            tagName: 'stop',
		            offset: 1
		        }]
		    }
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
			legend: {
				enabled: false,
			},
			series: [ {} ],
		});
	}

	updateChartData(data) {
		// Format into chart series
		const seriesData = data.map(({ datetime, amount }) =>  [ datetime, amount ]);

		this.chart.series[0].update({ data: seriesData });
		this.hideLoading();
	}

	xAxisFormatter(value) {
		const inputFormat = `YYYY-MM-DD hh:mm:ss`;
		const dateTime = moment(value, inputFormat);

		switch(this.interval) {
			// 1 day
			case 1:
				return dateTime.format(`h A`);

			// Default MMM DD format
			default:
				return dateTime.format(`MMM DD`);
		}
	}

	tooltipFormatter({ y }) {
		return `<div class="dashboard-line-chart__tooltip">$${y.toFixed(2)}</div>`;
	}

	bindCustomSelect() {
		this.customSelect.addEventListener('select', e => this.handleOptionSelect(e));
	}

	async handleOptionSelect(e) {
		this.interval = Number(e.detail);

		this.showLoading();

		let data;
		switch(this.interval) {
			case 1:
				data = await this.getOneDayData(); break;

			case 7:
				data = await this.getSevenDaysData(); break;

			case 30:
				data = await this.getThirtyDaysData(); break;
		}

		this.updateChartData(data);
	}

	showLoading() {
		this.element.classList.add('dashboard-line-chart--loading');
	}

	hideLoading() {
		this.element.classList.remove('dashboard-line-chart--loading');
	}
}

DashboardLineChart.selector = '.dashboard-line-chart';

export default DashboardLineChart;