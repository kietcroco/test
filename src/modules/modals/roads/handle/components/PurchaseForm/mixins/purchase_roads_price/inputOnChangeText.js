import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			purchase_roads_price: {
				...this.state.purchase_roads_price,
				value
			}
		});
	}
};