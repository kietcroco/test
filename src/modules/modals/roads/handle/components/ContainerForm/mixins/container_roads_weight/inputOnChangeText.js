import formatNumberInput from '~/utilities/formatNumberInput';

export default function onChangeText( value: String = "" ) {

	value = formatNumberInput( value );
	if( this.state.container_roads_weight.value !== value ) {

		this.setState({
			container_roads_weight: {
				...this.state.container_roads_weight,
				value
			}
		});
	}
};