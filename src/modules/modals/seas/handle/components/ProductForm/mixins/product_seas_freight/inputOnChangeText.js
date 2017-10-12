import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			product_seas_freight: {
				...this.state.product_seas_freight,
				value
			}
		});
	}
};