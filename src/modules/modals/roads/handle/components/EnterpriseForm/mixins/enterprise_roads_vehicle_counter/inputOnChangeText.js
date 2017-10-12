import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			enterprise_roads_vehicle_counter: {
				...this.state.enterprise_roads_vehicle_counter,
				value
			}
		});
	}
};