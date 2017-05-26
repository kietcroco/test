import React from 'react';
import { View, Text, Button } from 'react-native';
import Category from '../components/Category';
import SearchBar from '../components/SearchBar';
import ImageSlider from '~/components/ImageSlider';

class Rivers extends React.PureComponent {

	static navigationOptions = (...args) => {

		return ({
			
		});
	};

	render() {

		const { navigation } = this.props;

		return (
			<View style={ _styles.wrapper }>
				<SearchBar navigation={ navigation }/>

				<ImageSlider
					source 		= { ENTRIES }

				/>
			</View>
		);
	}
}


const ENTRIES = [
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
	'http://i.imgur.com/SsJmZ9jl.jpg',
	'http://i.imgur.com/pmSqIFZl.jpg',
	'http://i.imgur.com/5tj6S7Ol.jpg',
];

const _styles = {
	wrapper: {
		flex: 1
	}
};

export default Rivers;