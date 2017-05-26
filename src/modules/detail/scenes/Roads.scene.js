import React from 'react';
import { View, Text, Button } from 'react-native';

class Rivers extends React.PureComponent {

	render() {

		return (
			<View style={{flex: 1, backgroundColor: "blue"}}>
				<Text>Detail Roads</Text>

				<Button title="back" onPress={ () => {

					this.props.navigation.goBack();
				} }/>
			</View>
		);
	}
}

export default Rivers;