import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from '~/components/IconContact/Phone';
import Communications from 'react-native-communications';
import _styles from './styles';
import { translate } from '~/utilities/language';
import { hitSlop } from '~/configs/styles';

class Phone extends React.Component {

	static displayName = "@contact-phone";

	static propTypes = {
		style: PropTypes.object,
		prompt: PropTypes.bool,
		phoneNumber: PropTypes.string.isRequired,
		labelStyle: PropTypes.object,
		onPress: PropTypes.func
	};

	static defaultProps = {
		label: translate("Gọi điện"),
		prompt: true
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.label !== nextProps.label ||
			this.props.phoneNumber !== nextProps.phoneNumber ||
			this.props.prompt !== nextProps.prompt ||
			this.props.style != nextProps.style ||
			this.props.labelStyle != nextProps.labelStyle
		);
	}

	render() {

		const { style, labelStyle, onPress, label, prompt, phoneNumber } = this.props;

		return (

			<TouchableOpacity onPress={ e => {

				Communications.phonecall(
					phoneNumber, 
					prompt
				);

				onPress && onPress(e);
			} } style={ _styles.container } hitSlop={ hitSlop }>
				<Icon style={ [_styles.icon, style] }/>
				{ 
					!!label && 
						<Text style={ labelStyle ? [_styles.label, labelStyle] : _styles.label }>{ label }</Text>
				}
			</TouchableOpacity>
		);
	}
}

export default Phone;