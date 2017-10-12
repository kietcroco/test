import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.product_seas_weight.value !== value ) {

		this.setState({
			product_seas_weight: {
				...this.state.product_seas_weight,
				value
			}
		});
	}
};