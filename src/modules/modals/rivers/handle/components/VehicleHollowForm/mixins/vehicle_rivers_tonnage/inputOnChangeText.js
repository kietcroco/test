import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			vehicle_rivers_tonnage: {
				...this.state.vehicle_rivers_tonnage,
				value
			}
		});
	}
};