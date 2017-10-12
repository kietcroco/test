"use strict";
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from '~/components/IconContact/Email';
import Communications from 'react-native-communications';
import _styles from './styles';
import { hitSlop } from '~/configs/styles';

class Email extends React.Component {

	static displayName = "@contact-email";

	static propTypes = {
		style: PropTypes.object,
		labelStyle: PropTypes.object,
		label: PropTypes.string,
		onPress: PropTypes.func,
		to: PropTypes.array.isRequired,
		cc: PropTypes.array,
		bcc: PropTypes.array,
		subject: PropTypes.string,
		body: PropTypes.string
	};

	static defaultProps = {
		label: "Email",
		cc: null,
		bcc: null,
		subject: "IZIFIX",
		body: ""
	};

	shouldComponentUpdate(nextProps) {

		return (
			this.props.label !== nextProps.label ||
			this.props.to != nextProps.to ||
			this.props.cc != nextProps.cc ||
			this.props.bcc != nextProps.bcc ||
			this.props.subject !== nextProps.subject ||
			this.props.body !== nextProps.body ||
			this.props.labelStyle != nextProps.labelStyle ||
			this.props.style != nextProps.style
		);
	}

	render() {

		const { 
			style, 
			labelStyle, 
			onPress, 
			label,
			to,
			cc,
			bcc,
			subject,
			body
		} = this.props;

		return (

			<TouchableOpacity onPress={ e => {

				Communications.email(
					to, 
					cc, 
					bcc, 
					subject, 
					body
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

export default Email;