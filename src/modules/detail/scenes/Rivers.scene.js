import React from 'react';
import { View, Text, Button } from 'react-native';

class Rivers extends React.PureComponent {

	static navigationOptions = (...args) => {

		return ({
			
		});
	};

	render() {

		return (
			<View style={{flex: 1, backgroundColor: "red"}}>
				<Text>Detail Rivers</Text>

				<Button title="roads" onPress={ () => {

					this.props.navigation.navigate("/detail/roads");
				} }/>

				<Button title="list rivers" onPress={ () => {

					this.props.navigation.navigate("/list/rivers");
				} }/>

				<Button title="back" onPress={ () => {

					this.props.navigation.goBack();
				} }/>
			</View>
		);
	}
}

export default Rivers;