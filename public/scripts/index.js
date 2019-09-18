import CustomSelect from './custom-select.js';
import DashboardChart from './dashboard-chart.js';
import TripStops from './trip-stops.js';
import PlacesList from './places-list.js';
import Table from './table.js';
import Businesses from './businesses.js';

// Determine touch support
if ( 'ontouchstart' in document ) {
	document.body.classList.add('touch');
}

CustomSelect.init();
DashboardChart.init();
TripStops.init();
PlacesList.init();
Table.init();
Businesses.init();
