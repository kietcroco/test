import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			purchase_rivers_tonnage: {
				...this.state.purchase_rivers_tonnage,
				value
			}
		});
	}
};