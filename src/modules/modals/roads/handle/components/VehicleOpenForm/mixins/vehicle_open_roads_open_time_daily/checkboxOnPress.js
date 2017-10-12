//import { translate } from '~/utilities/language';

export default function onPress() {

	this.setState({
		vehicle_open_roads_open_time_daily: {
			...this.state.vehicle_open_roads_open_time_daily,
			value: this.state.vehicle_open_roads_open_time_daily.value == 0 ? 1 : 0 
		}
	});
};
