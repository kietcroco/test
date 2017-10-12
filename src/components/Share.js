import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Share, {ShareSheet, Button} from 'react-native-share';
import { hitSlop } from '~/configs/styles';

class ShareButton extends React.Component {

	static displayName = '@ShareButton';

	static propTypes = {
		style: PropTypes.object,
		children: PropTypes.node.isRequired,
		title: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.title !== nextProps.title ||
			this.props.message !== nextProps.message ||
			this.props.url !== nextProps.url ||
			this.props.children != nextProps.children ||
			this.props.style != nextProps.style
		);
	}

	render() {

		const { 
			style, 
			children,
			title,
			message,
			url
		} = this.props;

		const shareOptions = {
			title,
			message,
			url,
			social: "facebook"
		};

		return (
			<View style={ _styles.container }>
				<TouchableOpacity hitSlop={ hitSlop } onPress={ () => {

					Share.open( shareOptions );
				} } style={ style }>
					{ children }
				</TouchableOpacity>
			</View>
		);
	}
}

const _styles = {
	container: {
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	}
};

export default ShareButton;