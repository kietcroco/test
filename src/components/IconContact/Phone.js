import PropTypes from 'prop-types';
import React from 'react';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import _styles from './styles';
import { View } from 'react-native';
import mergeStyle from '~/library/mergeStyle';

class Phone extends React.Component {

	static displayName = "@icon-phone";

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
				<MTIcon style={style ? [ _styles.icon, Array.isArray(style) ? mergeStyle(style) : style ] : _styles.icon} name='phone-in-talk' />
			</View>
			
		);
	}
}

export default Phone;