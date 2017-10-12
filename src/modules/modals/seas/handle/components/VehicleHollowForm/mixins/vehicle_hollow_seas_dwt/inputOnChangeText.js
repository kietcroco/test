import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			vehicle_hollow_seas_dwt: {
				...this.state.vehicle_hollow_seas_dwt,
				value
			}
		});
	}
};