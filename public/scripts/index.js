import CustomSelect from './custom-select.js';
import DashboardLineChart from './dashboard-line-chart.js';
import DashboardDonutChart from './dashboard-donut-chart.js';
import ReportDetailTable from './report-detail-table.js';
import BusinessSettingsUpload from './business-settings-upload.js';


// Determine touch support
if ( 'ontouchstart' in document ) {
	document.body.classList.add('touch');
}

CustomSelect.init();
DashboardLineChart.init();
DashboardDonutChart.init();
ReportDetailTable.init();
BusinessSettingsUpload.init();