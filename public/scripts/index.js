import CustomSelect from './custom-select.js';
import DashboardLineChart from './dashboard-line-chart.js';
// import TripStops from './trip-stops.js';
// import PlacesList from './places-list.js';
// import Table from './table.js';
// import Businesses from './businesses.js';


// Determine touch support
if ( 'ontouchstart' in document ) {
	document.body.classList.add('touch');
}

CustomSelect.init();
DashboardLineChart.init();
// TripStops.init();
// PlacesList.init();
// Table.init();
// Businesses.init();
