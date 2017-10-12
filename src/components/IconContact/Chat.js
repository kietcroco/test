import PropTypes from 'prop-types';
import React from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import _styles from './styles';
import { View } from 'react-native';
import mergeStyle from '~/library/mergeStyle';

class Chat extends React.Component {

	static displayName = "@icon-chat";

	static propTypes = {
		style: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		])
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.style != nextProps.style
		);
	}

	render() {

		const { style } = this.props;

		return (
			<View style={ _styles.container }>
				<FAIcon style={style ? [ _styles.icon, Array.isArray(style) ? mergeStyle(style) : style ] : _styles.icon} name='skype' />
			</View>
		);
	}
}

export default Chat;