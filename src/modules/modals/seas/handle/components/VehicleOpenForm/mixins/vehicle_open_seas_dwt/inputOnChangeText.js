import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			vehicle_open_seas_dwt: {
				...this.state.vehicle_open_seas_dwt,
				value
			}
		});
	}
};