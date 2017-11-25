import React from 'react';
import { Image as RNImage } from 'react-native';

class Image extends React.Component {

	static displayName = '@Image';

	constructor( props ) {
		super( props );

		this.state = {
			source: props.source
		};
	}

	_onError = () => {

		this.setState({
			source: require('~/assets/images/no_image.png')
		});
	};

	render() {

		const {
			children,
			...otherProps
		} = this.props;

		return (
			<RNImage { ...otherProps } source={ this.state.source } onError={ this._onError }>
				{ children }
			</RNImage>
		);
	}
}

export default Image;