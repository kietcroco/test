import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			vehicle_roads_tonnage: {
				...this.state.vehicle_roads_tonnage,
				value
			}
		});
	}
};