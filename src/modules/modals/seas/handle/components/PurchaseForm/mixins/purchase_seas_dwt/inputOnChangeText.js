import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			purchase_seas_dwt: {
				...this.state.purchase_seas_dwt,
				value
			}
		});
	}
};