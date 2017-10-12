import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.value !== value ) {

		this.setState({
			container_roads_freight: {
				...this.state.container_roads_freight,
				value
			}
		});
	}
};