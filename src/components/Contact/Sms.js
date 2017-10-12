import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from '~/components/IconContact/Sms';
import Communications from 'react-native-communications';
import _styles from './styles';
import { translate } from '~/utilities/language';
import { hitSlop, scale } from '~/configs/styles';

class SMS extends React.Component {

	static displayName = "@contact-sms";

	static propTypes = {
		style: PropTypes.object,
		phoneNumber: PropTypes.string.isRequired,
		body: PropTypes.string,
		labelStyle: PropTypes.object,
		onPress: PropTypes.func
	};

	static defaultProps = {
		label: translate("Nhắn tin"),
		body: ""
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.label !== nextProps.label ||
			this.props.phoneNumber !== nextProps.phoneNumber ||
			this.props.body !== nextProps.body ||
			this.props.style != nextProps.style ||
			this.props.labelStyle != nextProps.labelStyle
		);
	}

	render() {

		const { style, labelStyle, onPress, label, body, phoneNumber } = this.props;

		return (

			<TouchableOpacity onPress={ e => {

				Communications.text(
					phoneNumber, 
					body
				);

				onPress && onPress(e);
			} } style={ _styles.container } hitSlop={ hitSlop }>
				<Icon style={ [{
					fontSize: 16 * scale
				}, style] }/>
				{ 
					!!label && 
					<Text style={ labelStyle ? [_styles.label, labelStyle] : _styles.label }>{ label }</Text>
				}
			</TouchableOpacity>
		);
	}
}

export default SMS;